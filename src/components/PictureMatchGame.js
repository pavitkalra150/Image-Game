import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Tile from './Tile';
import ScoreTable from './ScoreTable';

const emojis = ['😀', '😎', '😍', '🚀', '🌈', '🎉', '🌟', '💡']; // Define your emojis

class PictureMatchGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.shuffleTiles(this.generateTiles()),
      timerStarted: false,
      timerSeconds: 0,
      flippedTile: null,
      moves: 0, // Add a moves counter
    };
    this.focusListener = this.props.navigation.addListener('focus', () => {
      if (this.state.gameOver) {
        this.resetGame();
      }
    });
  }
   componentWillUnmount() {
    // Clean up the focus listener
    this.focusListener();
  }

  resetGame() {
    this.setState({
      tiles: this.shuffleTiles(this.generateTiles()),
      timerStarted: false,
      timerSeconds: 0,
      flippedTile: null,
      moves: 0,
      gameOver: false,
    });
  }
  handleGameCompletion() {
    clearInterval(this.timerInterval);
    this.setState({ gameOver: true });
  
    this.props.navigation.navigate('ScoreTable', {
      time: this.state.timerSeconds,
      moves: this.state.moves,
      onReturn: () => {
        // Reset the game when returning from the score screen
        this.resetGame();
      },
    });
  }

  shuffleTiles(tiles) {
    // Fisher-Yates shuffle algorithm
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
  }

  generateTiles() {
    const duplicatedEmojis = emojis.concat(emojis);
    // Randomly shuffle the duplicated emojis array
    const shuffledEmojis = this.shuffleTiles([...duplicatedEmojis]);
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isHidden: true,
    }));
  }

  startTimer() {
    this.setState({ timerStarted: true });
    const timerInterval = setInterval(() => {
      this.setState((prevState) => ({ timerSeconds: prevState.timerSeconds + 1 }));
    }, 1000);

    // Remember to clear the interval to avoid memory leaks
    this.timerInterval = timerInterval;
  }

  restartGame() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.setState({
      tiles: this.shuffleTiles(this.generateTiles()),
      timerStarted: false,
      timerSeconds: 0,
      flippedTile: null,
      moves: 0, // Reset the moves counter
    });
  }

  onTilePress(tile) {
    if (
      !this.state.timerStarted ||
      !tile.isHidden ||
      this.state.flippedTileCount >= 2 ||
      this.state.gameOver
    ) {
      return;
    }
  
    const updatedTiles = this.state.tiles.map((t) => {
      if (t.id === tile.id) {
        return { ...t, isHidden: false };
      }
      return t;
    });
  
    this.setState((prevState) => ({
      tiles: updatedTiles,
      flippedTileCount: prevState.flippedTileCount + 1,
    }));
  
    if (this.state.flippedTile) {
      if (this.state.flippedTile.emoji === tile.emoji) {
        this.setState({ flippedTile: null, flippedTileCount: 0 });
      } else {
        setTimeout(() => {
          const updatedTiles = this.state.tiles.map((t) => {
            if (t.id === tile.id || t.id === this.state.flippedTile.id) {
              return { ...t, isHidden: true };
            }
            return t;
          });
  
          this.setState({ flippedTile: null, tiles: updatedTiles, flippedTileCount: 0 });
        }, 1000);
      }
    } else {
      this.setState((prevState) => ({
        flippedTile: tile,
      }));
    }
  
    if (this.state.flippedTileCount % 2 === 1) {
      // Increment the moves counter only after every two flips
      this.setState((prevState) => ({
        moves: prevState.moves + 1,
      }));
    }
  
    if (updatedTiles.every((t) => !t.isHidden)) {
      // All tiles are matched, stop the game
      clearInterval(this.timerInterval);
      this.setState({ gameOver: true });
      console.log('Game Over!');
    }
  }

  renderTile(tile) {
    return (
      <Tile
        key={tile.id}
        emoji={tile.emoji}
        isHidden={tile.isHidden}
        onPress={() => this.onTilePress(tile)}
      />
    );
  }

  renderTiles() {
    return this.state.tiles.map((tile) => this.renderTile(tile));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topButtons}>
          {this.state.timerStarted ? (
            <Button title="Restart Game" onPress={() => this.restartGame()} style={styles.restartButton} />
          ) : (
            <Button title="Start Timer" onPress={() => this.startTimer()} />
          )}
        </View>
        <View style={styles.grid}>{this.renderTiles()}</View>
        <Text style={styles.timerLabel}>{`Timer: ${this.state.timerSeconds} seconds`}</Text>
        <Text style={styles.movesLabel}>{`Moves: ${this.state.moves}`}</Text>
        {this.state.gameOver && (
          <Button title="View Score Table" onPress={() => this.handleGameCompletion()} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300, // Adjust as needed
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  timerLabel: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  movesLabel: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  restartButton: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
});

export default PictureMatchGame;

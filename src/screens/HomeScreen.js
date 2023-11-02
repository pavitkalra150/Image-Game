// HomeScreen.js
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PictureMatchGame from '../components/PictureMatchGame';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
    };
  }

  startGame = () => {
    this.setState({ gameStarted: true });
  };

  render() {
    if (this.state.gameStarted) {
      return (
        // Render PictureMatchGame here or navigate to it
        <PictureMatchGame />
      );
    }

    return (
      <View style={styles.container}>
        <Button title="Start" onPress={this.startGame} />
        <View style={styles.canvas}>
          <Text>Canvas goes here</Text>
        </View>
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
  canvas: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;

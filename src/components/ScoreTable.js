import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [], // Your score table data
    };
  }

  componentDidMount() {
    // Retrieve the time and moves from route params
    const { time, moves } = this.props.route.params;

    // Add the new score to the existing scores
    const newScore = {
      time,
      moves,
    };

    this.setState((prevState) => ({
      scores: [...prevState.scores, newScore],
    }));
  }

  render() {
    // Sort the scores based on a criterion, e.g., by time
    const sortedScores = [...this.state.scores].sort((a, b) => a.time - b.time);

    // Render your score table here
    return (
      <View style={styles.container}>
        {sortedScores.map((score, index) => (
          <View style={styles.scoreEntry} key={index}>
            <Text style={styles.scoreText}>Time: {score.time} seconds</Text>
            <Text style={styles.scoreText}>Moves: {score.moves}</Text>
          </View>
        ))}
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
  scoreEntry: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
  },
});

export default ScoreTable;

import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Tile extends Component {
  render() {
    const { emoji, isHidden, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={onPress}
      >
        <Animatable.View
          animation={isHidden ? null : 'flipInY'}
          duration={500}
          style={isHidden ? styles.tileContentHidden : styles.tileContentVisible}
        >
          {!isHidden && <Text style={styles.visibleText}>{emoji}</Text>}
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}

const tileSize = 65; // Adjust the tile size as needed

const styles = StyleSheet.create({
  tile: {
    width: tileSize,
    height: tileSize,
    backgroundColor: 'blue',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileContentHidden: {
    width: tileSize,
    height: tileSize,
    backgroundColor: 'black',
    margin: 5,
  },
  tileContentVisible: {
    width: tileSize,
    height: tileSize,
    backgroundColor: 'lightblue', // Change the background color for visible tiles
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visibleText: {
    fontSize: 20, // Adjust the font size as needed
  },
});

export default Tile;

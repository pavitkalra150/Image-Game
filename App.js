import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PictureMatchGame from './src/components/PictureMatchGame';
import ScoreTable from './src/components/ScoreTable';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    <Stack.Screen name="Game" component={PictureMatchGame} />
    <Stack.Screen name="ScoreTable" component={ScoreTable} />
  </Stack.Navigator>
    </NavigationContainer>
  );
}

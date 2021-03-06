import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './Screens/QuizScreen';
import ResultScreen from './Screens/ResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Quiz" component={QuizScreen}/>
        <Stack.Screen name='Result' component={ResultScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
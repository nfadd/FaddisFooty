import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register, Login, Welcome } from './screens';
import { StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} options={options.screen}/>
        <Stack.Screen name="Login" component={Login} options={options.screen}/>
        <Stack.Screen name="Register" component={Register} options={options.screen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const options = StyleSheet.create({
  screen: {
    headerShown: false,
  }
})

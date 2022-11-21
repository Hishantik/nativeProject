import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Main from '../screens/MainScreen';
import SignUp from '../screens/SignupScreen';
import Onboard from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen component={Onboard} name="Onboard" options={{ headerShown: false }} />
        <Stack.Screen component={Main} name="Main" options={{
          headerShown: false,
        }} />
        <Stack.Screen component={LoginScreen} name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default AuthStack;

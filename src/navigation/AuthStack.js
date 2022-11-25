import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//importing screens
import LoginScreen from '../screens/LoginScreen';
import Main from '../screens/MainScreen';
import SignUp from '../screens/SignupScreen';
import Splash from '../screens/SplashScreen';
import Onboard from '../screens/OnboardingScreen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={Onboard} name="Onboard" />
      <Stack.Screen component={Main} name="Main" />
      <Stack.Screen component={AppStack} name="AppStack"/>
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={SignUp} name="SignUp" />
    </Stack.Navigator>
  );
};

export default AuthStack;

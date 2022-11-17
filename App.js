import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Main from './screens/MainScreen';
import SignUp from './screens/SignupScreen';
// import MainTabScreen from './screens/MainTab';
// import ProfileScreen from './screens/Profile';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Main} name="Main" options={{
          headerShown: false,
        }} />
        <Stack.Screen component={LoginScreen} name="LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



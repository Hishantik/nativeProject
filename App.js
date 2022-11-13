// import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard'
// import mainTabScreen from './screens/MainTab';

const Drawer = createDrawerNavigator();



function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#009387'
        },
        headerTintColor:'#121212',
        headerTitleStyle:{
          fontWeight:'800'
        }
      }}>
        <Drawer.Screen name="Login" component={LoginScreen} options={{
          title:'Welcome to CryptoChart'
        }} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;



// import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import MainTabScreen from './screens/MainTab';
import ProfileScreen from './screens/Profile';

const Drawer = createDrawerNavigator();



function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#fff'
        },
        headerTintColor:'#121212',
        headerTitleStyle:{
          fontWeight:'bold'
        }
      }}>
        <Drawer.Screen name="mainTabScreen" component={MainTabScreen} options={{
          title:'Dashboard'
        }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;



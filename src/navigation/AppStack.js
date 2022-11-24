import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//importing screens
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

const AppStack = () => {

  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen component={HomeScreen} name="HomeScreen" />
    </Drawer.Navigator>
  );
};

export default AppStack;

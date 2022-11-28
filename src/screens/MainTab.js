import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeScreen from './HomeScreen';
import ProfileScreen from './Profile';
import Notification from './Notification';

// const HomeStack = createNativeStackNavigator(); 
// const ProfileStack = createNativeStackNavigator(); 
// const AboutStack = createNativeStackNavigator(); 
const Tab = createMaterialBottomTabNavigator();









function MainTabScreen() {
  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="Dashboard"
      activeColor="#576574"
      inactiveColor="#ffffff"
      shifting={true}
    // barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#6c63ff',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#ffc100',
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={Notification}
        options={{
          tabBarColor: '#92e3a9',
          tabBarLabel: 'Notification',
          tabBarBadge: 3,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export default MainTabScreen;

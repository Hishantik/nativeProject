import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import HomeScreen from './HomeScreen';
import Portfolio from './PortfolioScreen';
import Notification from './Notification';
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";


// const HomeStack = createNativeStackNavigator(); 
// const ProfileStack = createNativeStackNavigator(); 
// const AboutStack = createNativeStackNavigator(); 
const Tab = createMaterialBottomTabNavigator();









function MainTabScreen() {
  return (
    <Tab.Navigator
      // labeled={false}
      initialRouteName="HomeScreen"
      tabBarActiveBackgroundColor='#fff'
      activeColor="#636637"
      inactiveColor="#ddd"
      barStyle={{
        backgroundColor: '#3d3d3d'
      }}
    // barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaskedView maskElement={<MaterialIcons name="home" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <MaterialIcons name="home" color={color} size={26} style={{ opacity: 0 }} />
              </LinearGradient>
            </MaskedView>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Portfolio}
        options={{
          tabBarLabel: 'Profile',
          tabBarBadge: 3,
          tabBarIcon: ({ color }) => (
            <MaskedView maskElement={<Ionicons name="person-sharp" color={color} size={26} style={{ backgroundColor: 'transparent', }} />
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Ionicons name="person-sharp" color={color} size={26} style={{ opacity: 0 }} />
              </LinearGradient>
            </MaskedView>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={Notification}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => (
            <MaskedView maskElement={<Fontisto name="player-settings" color={color} size={26} style={{ backgroundColor: 'transparent', }} />
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ padding: 5 }}>
                <Fontisto name="player-settings" color={color} size={23} style={{ opacity: 0, margin: 10 }} />
              </LinearGradient>
            </MaskedView>
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export default MainTabScreen;

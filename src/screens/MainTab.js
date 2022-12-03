import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
      <Tab.Navigator
        labeled={false}
        initialRouteName="Dashboard"
        activeColor="#636637"
        inactiveColor="#ddd"
        shifting={false}
        barStyle={{
          backgroundColor: 'transparent'
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
            tabBarIcon: ({ color }) => (
              <MaskedView maskElement={<AntDesign name="linechart" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
              }>
                <LinearGradient colors={['#5f2c82', '#49a09d']}>
                  <AntDesign name="linechart" color={color} size={26} style={{ opacity: 0 }} />
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
            tabBarBadge: 3,
            tabBarIcon: ({ color }) => (
              <MaskedView maskElement={<MaterialIcons name="notifications" color={color} size={26} style={{ backgroundColor: 'transparent' }} />
              }>
                <LinearGradient colors={['#5f2c82', '#49a09d']}>
                  <MaterialIcons name="notifications" color={color} size={26} style={{ opacity: 0 }} />
                </LinearGradient>
              </MaskedView>
            ),
          }}
        />
      </Tab.Navigator>
    </LinearGradient>
  );
}



export default MainTabScreen;

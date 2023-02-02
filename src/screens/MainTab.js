import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

import HomeScreen from './HomeScreen';
// import Portfolio from './PortfolioScreen';
import Settings from './Notification';
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";


// const HomeStack = createNativeStackNavigator(); 
// const ProfileStack = createNativeStackNavigator(); 
// const AboutStack = createNativeStackNavigator(); 
const Tab = createMaterialBottomTabNavigator();









function MainTabScreen() {
  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="HomeScreen"
      tabBarActiveBackgroundColor='#fff'
      activeColor="#636637"
      inactiveColor="#ddd"
      barStyle={{
        backgroundColor: '#3d3d3d',
        padding: 5,
      }}
    // barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <MaskedView maskElement={<Octicons name="home" color={color} size={focused ? 30 : 26} style={{ backgroundColor: 'transparent' }} />
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ width: 30, height: 30 }}>
                <Octicons name="home" color={color} size={focused ? 30 : 26} style={{ opacity: 0 }} />
              </LinearGradient>
            </MaskedView>
          ),
        }}
      />
      {/* <Tab.Screen */}
      {/*   name="Profile" */}
      {/*   component={Portfolio} */}
      {/*   options={{ */}
      {/*     tabBarLabel: 'Profile', */}
      {/*     tabBarBadge: 3, */}
      {/*     tabBarIcon: ({ focused, color }) => ( */}
      {/*       <MaskedView maskElement={<Ionicons name="ios-person-circle-outline" color={color} size={focused ? 30 : 26} style={{ backgroundColor: 'transparent', }} /> */}
      {/*       }> */}
      {/*         <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ width: 30, height: 30 }}> */}
      {/*           <Ionicons name="ios-person-circle-outline" color={color} size={26} style={{ opacity: 0 }} /> */}
      {/*         </LinearGradient> */}
      {/*       </MaskedView> */}
      {/*     ), */}
      {/*   }} */}
      {/* /> */}
      {/* <Tab.Screen */}
      {/*   name="About" */}
      {/*   component={Settings} */}
      {/*   options={{ */}
      {/*     tabBarLabel: 'Settings', */}
      {/*     tabBarIcon: ({ focused, color }) => ( */}
      {/*       <MaskedView maskElement={<Feather name="settings" color={color} size={focused ? 30 : 26} style={{ backgroundColor: 'transparent' }} /> */}
      {/*       }> */}
      {/*         <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ width: 30, height: 30 }}> */}
      {/*           <Feather name="settings" color={color} size={23} style={{ opacity: 0, }} /> */}
      {/*         </LinearGradient> */}
      {/*       </MaskedView> */}
      {/*     ), */}
      {/*   }} */}
      {/* /> */}
    </Tab.Navigator>
  );
}



export default MainTabScreen;

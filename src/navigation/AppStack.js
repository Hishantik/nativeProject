import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//importing screens
import MainTabScreen from '../screens/MainTab';
import Settings from '../screens/Notification';
import Portfolio from '../screens/PortfolioScreen';
import CustomDrawer from '../../Components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: "#6c63ff",
      drawerActiveTintColor: '#ffffff',
      drawerInactiveTintColor: '#c6c6c6',
      swipeEdgeWidth: 0
    }}>
      <Drawer.Screen component={MainTabScreen} name="DashBoard" />
      <Drawer.Screen component={Portfolio} name="Profile" />
      <Drawer.Screen component={Settings} name="Settings" />
    </Drawer.Navigator>
  );
}

export default AppStack;

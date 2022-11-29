import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//importing screens
import MainTabScreen from '../screens/MainTab';
import Notification from '../screens/Notification';
import CustomDrawer from '../../Components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: "#6c63ff",
      drawerActiveTintColor: '#ffffff',
      swipeEdgeWidth: 0
    }}>
      <Drawer.Screen component={MainTabScreen} name="DashBoard" />
      <Drawer.Screen component={Notification} name="Nofifications" />
    </Drawer.Navigator>
  );
}

export default AppStack;

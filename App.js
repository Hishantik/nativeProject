import React from 'react';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/navigation/AppNav';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// import MainTabScreen from './screens/MainTab';
// import ProfileScreen from './screens/Profile';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;



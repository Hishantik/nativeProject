import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// import MainTabScreen from './screens/MainTab';
// import ProfileScreen from './screens/Profile';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;



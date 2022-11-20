import React, { useContext, useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {firebase} from '../../config.js';
import AuthStack from './AuthStack';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../Context/AuthContext';

const AppNav = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  //Handle user state changees
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <HomeScreen /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNav;






  // if (isLoading) {
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
  //     <ActivityIndicator size="large" />
  //   </View>
  // }

import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '../../config.js';

export default function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        const routeName = user !== null ? 'HomeScreen' : 'Onboard';
        navigation.dispatch(StackActions.replace(routeName));
        console.log(user);
      });
      unsubscribe();
    }, 2000);

    return () => { };
  }, []);



  return (
    < View style={styles.container} >
      <Text>SplashScreen</Text>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


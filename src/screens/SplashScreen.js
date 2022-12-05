import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { firebase } from '../../config.js';

export default function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(async() => {
      const unsubscribe = await firebase.auth().onAuthStateChanged((user) => {
        const routeName = user !== null ? 'HomeScreen' : 'Onboard';
        navigation.dispatch(StackActions.replace(routeName));
      });
      unsubscribe();
    }, 1000);

    return () => { };
  }, []);



  return (
    < View style={styles.container} >
      <Image style={{
        width: 300,
        height: 300
      }} source={require('../../assets/Png/6c63ff-logo.png')} />
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


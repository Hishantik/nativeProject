import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { firebase } from '../../config.js';

export default function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(async () => {
      const unsubscribe = await firebase.auth().onAuthStateChanged((user) => {
        const routeName = user !== null ? 'HomeScreen' : 'Onboard';
        navigation.dispatch(StackActions.replace(routeName));
      });
      unsubscribe();
    }, 1000);

    return () => { };
  }, []);



  return (
    <LinearGradient
      colors={['#232526', '#414345']}
      style={{ flex: 1 }}
    >
      < View style={styles.container} >
        <Image style={{
          width: 160,
          height: 160
        }} source={require('../../assets/Png/BrandLogo.png')} />
      </View >
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


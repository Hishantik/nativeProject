import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const Notification = () => {
  return (
    <LinearGradient
      colors={['#232526', '#414345']}
      style={{ flex: 1 }}
    >
      <Text>hello</Text>
    </LinearGradient>
  );
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

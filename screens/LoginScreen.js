import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.push('Dashboard')}
      />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  }
  
})

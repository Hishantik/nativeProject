import React from 'react';
import { View, Text, Button, Stylesheet } from 'react-native';

const ProfileScreen = () => {
  return(
  <View style = { styles.conatiner } >
    <Text>Profile Screen</Text>
    <Button title="Click here" onPress={()=>alert('Button clicked')}
    />
  </View >
  );
}

export default ProfileScreen;

const styles = Stylesheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

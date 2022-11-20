import React from 'react';
import {StyleSheet, View,Text,} from 'react-native';

function Notification (){
  return (
    <View style={styles.container}>
      <Text>
        Hello welcome to Deku Graph.
      </Text>
    </View>
  );
}

export default Notification;

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
  }
})

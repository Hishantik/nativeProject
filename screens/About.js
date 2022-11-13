import React from 'react';
import {Stylesheet,View,Text,Button} from 'react-native';

const AboutScreen =()=>{
  return (
    <View style={styles.container}>
      <Text>
          Hi this is About section
      </Text>
    </View>
  );
}

export default AboutScreen;

const styles=Stylesheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'row',
    backgroundColor:'#000',
  }
})

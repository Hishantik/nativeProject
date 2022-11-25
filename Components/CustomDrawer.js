import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#6c63ff'}}>
        <ImageBackground source={require('../assets/Png/black-paper.png')} style={{padding:60}}></ImageBackground>
        <DrawerItemList {...props} />

      </DrawerContentScrollView>
    </View>
  );
}

export default CustomDrawer;

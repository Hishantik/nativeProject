import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../config.js';





const CustomDrawer = (props) => {
  const [user, setUser] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data())
        }
        else {
          console.log("User doesn't exists");
        }
      })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#6c63ff' }}>
        <ImageBackground source={require('../assets/Png/black-paper.png')} style={{
          padding: 60,
        }}>
          <Image source={require('../assets/Png/Profile.png')} style={{
            height: 90,
            width: 90,
            borderRadius: 45,
            marginBottom: 10,
            borderColor: "#57606f",
            borderWidth: 2,
            marginLeft: -20
          }} />
          <Text style={{
            marginLeft: -25,
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
          }}>{user.userName}</Text>
        </ImageBackground>
        <View style={{
          backgroundColor: "#fff",
          paddingTop: 10
        }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{
        backgroundColor: "#fff",
        bottomMargin: 20,
        justifyContent:'center',
        borderTopWidth:1,
        borderTopColor:'#dfe4ea'
      }}>
        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          paddingVertical:20,
        }}>
           <MaterialCommunityIcons name="share" size={26}/>
          <TouchableOpacity style={{
            // bottomMargin: 10,
            marginLeft:10,
          }}>
            <Text style={{
              fontSize:16,
              fontWeight:'500',
              fontStyle:'italic',
            }}>Invite friend?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{
          backgroundColor: '#6c63FF',
          borderRadius: 50,
          alignSelf: "center",
          marginBottom:40,
          width: '50%',
          paddingVertical: 10,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
        }}
          onPress={async () => {
            await firebase.auth().signOut();
            navigation.dispatch(StackActions.replace('LoginScreen'));
          }}
        >
          <MaterialCommunityIcons name='exit-to-app' size={20} color={"#ffffff"}/>
          <Text style={{ marginLeft:10, textAlign: 'center', color: '#fff' }}>logout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default CustomDrawer;

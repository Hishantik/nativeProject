import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../config.js';
import { LinearGradient } from 'expo-linear-gradient';





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
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1, }}>
        <DrawerContentScrollView {...props}  >
          <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ flex: 1, marginTop: -5 }}>
            <ImageBackground source={require('../assets/Png/black-paper.png')} style={{
              padding: 60,
            }}>
              <Image source={require('../assets/Png/Profile.png')} style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                marginBottom: 10,
                position: 'absolute',
                top: 70,
                left: 112,
                borderColor: "#57606f",
                borderWidth: 2,
                marginLeft: -20
              }} />
            </ImageBackground>
          </LinearGradient>
          <View style={{
            flex: 1,
            marginTop:55,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 16,
            }}>{user.userName}</Text>
          </View>
          <View style={{
            marginTop: 100,
            height: '100%'
          }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </LinearGradient>
      <View style={{
        bottomMargin: 20,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#dfe4ea'
      }}>
        <LinearGradient colors={['#232526', '#414345']} >
          <View style={{
            paddingVertical: 20,
          }}>
            <TouchableOpacity style={{
              // bottomMargin: 10,
              justifyContent: 'center',
              flexDirection: 'row',
              marginLeft: 10,
            }}>
              <MaterialCommunityIcons name="share" color={'#c6c6c6'} size={26} />
              <Text style={{
                marginLeft: 4,
                fontSize: 16,
                fontWeight: '500',
                fontStyle: 'italic',
                color: '#c6c6c6'
              }}>Invite friend?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{
          }}
            onPress={async () => {
              await firebase.auth().signOut();
              navigation.dispatch(StackActions.replace('LoginScreen'));
            }}
          >
            <LinearGradient colors={['#5f2c82', '#49a09d']} style={{
              backgroundColor: '#6c63FF',
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 40,
              width: '50%',
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialCommunityIcons name='exit-to-app' size={20} color={"#c6c6c6"} />
              <Text style={{ marginLeft: 10, textAlign: 'center', color: '#c6c6c6' }}>logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

export default CustomDrawer;

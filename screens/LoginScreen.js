import React from 'react';
import {  Text, View,  SafeAreaView, TouchableOpacity,} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LoginImg from '../assets/Svg/bg9-1.svg';
import Facebook from '../assets/Socials/icons8-facebook.svg';
import Google from '../assets/Socials/icons8-google.svg';
import Twitter from '../assets/Socials/icons8-twitter.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen=({ navigation })=>{
  return (
    <SafeAreaView style={{
      backgroundColor: '#ffffff',
      flex: 1,
      justifyContent: 'center',
    }}>
      <View style={{ marginBottom: 140 }}></View>
      <View style={{
        paddingHorizontal: 25,
      }}>
        <View style={{ position: 'absolute', top: -240, left: 50 }}>
          <LoginImg width={300} height={300} />
        </View>
        <Text style={{
          fontSize: 26,
          fontWeight: '500',
          marginVertical:30,
        }}>Login</Text>
        <View style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderRadius: 50,
          padding: 10,
          alignItems: 'center',
        }}>
          <Entypo name="email" size={14} style={{ paddingHorizontal: 10, }} color='#666' />
          <TextInput placeholder='email Id' style={{ fontSize: 15, marginHorizontal: 5, flex: 1, }} keyboardType='email-address' />
        </View>
        <View style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderRadius: 50,
          padding: 10,
          marginTop: 20,
          alignItems: 'center',
        }}>
          <Ionicons name="ios-lock-closed-outline" size={14} style={{ paddingHorizontal: 10, }} color='#666' />
          <TextInput placeholder='password' style={{ fontSize: 15, marginHorizontal: 5, flex: 1, }} secureTextEntry={true} />
          <TouchableOpacity>
            <Text style={{ fontWeight: '700', color: '#6633FF' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', }}>
          <TouchableOpacity style={{
            elevation:10,
            backgroundColor: '#6633FF',
            borderRadius: 50,
            marginTop: 20,
            width: '50%',
            paddingVertical: 10,
          }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>Login</Text>
          </TouchableOpacity>
          <Text style={{ color: '#666', marginTop: 20 }}>Or, Sign in with</Text>
        </View>
        <View style={{
          width: '100%',
          marginLeft: 27,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          position: 'absolute',
          bottom: -50,
        }}>
          <TouchableOpacity onPress={() => navigation.push()}>
            <Facebook width={35} height={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push()}>
            <Google width={35} height={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push()}>
            <Twitter width={35} height={35} />
          </TouchableOpacity>
        </View>
        <View style={{
          position: 'absolute',
          bottom: -100,
          left: 130,
          width: '50%',
          flexDirection: 'row',
        }}>
          <Text style={{ fontWeight: '200', color: '#666' }}>New user?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
            <Text style={{ color: '#6633FF', fontWeight: 'bold', marginHorizontal: 10 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;


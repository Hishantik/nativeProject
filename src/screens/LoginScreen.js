import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { firebase } from '../../config.js'
import Facebook from '../../assets/Socials/icons8-facebook.svg';
import Google from '../../assets/Socials/icons8-google.svg';
import Twitter from '../../assets/Socials/icons8-twitter.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');


  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(user);
        setMessage('');
        if (user.user.emailVerified) {
          alert('You are verified')
          navigation.dispatch(StackActions.replace('AppStack'));
        } else {
          alert('Please Verify your email to Login');
        }
      } else {
        alert("Please enter Login/Password");
        await firebase.auth().currentUser.sendEmailVerification();
        await firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  }


  //Email and Password validation
  // const validate = () => {
  //   if (!email.includes('@')) {
  //     setEmailError('Invalid Email ');
  //   }
  //   else if (password.length < 8) {
  //     setPasswordError('Password field must contain atleast 8 characters with special symbols');
  //   }
  //   else if (email.length === 0) {
  //     setEmailError('Email required');
  //   }
  //   else if (email.indexOf(' ') >= 0) {
  //     setEmailError('Email must not contain spaces or empty characters')
  //   }
  //   else if (password.indexOf(' ') >= 0) {
  //     setPasswordError('Password field must not contain empty characters or spaces')
  //   }
  //   else {
  //     setEmailError('');
  //     setPasswordError('');
  //   }
  // }



  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset mail sent")
      }).catch(() => {
        alert("Please provide Email on the above email field")
      })
  }

  return (
    <LinearGradient
      colors={['#232526', '#414345']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{
        flex: 1,
      }}>
        <View style={{
          paddingHorizontal: 25,
        }}>
          <View style={{ paddingLeft: 20, marginTop: 10 }}>
            <Image style={{
              width: 300,
              height: 300,
            }} source={require('../../assets/Png/Login-amico.png')} />
          </View>
          <MaskedView maskElement={
            <Text style={{
              fontSize: 26,
              fontWeight: '500',
              backgroundColor: 'transparent',
            }}>Login</Text>
          }>
            <LinearGradient colors={['#5f2c82', '#49a09d']}>
              <Text style={{
                fontSize: 26,
                opacity: 0,
                fontWeight: '500',
                marginVertical: 15,
              }}>Login</Text>
            </LinearGradient>
          </MaskedView>
          <View style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#8395a7',
            borderRadius: 50,
            padding: 10,
            alignItems: 'center',
          }}>
            <Entypo name="email" size={14} style={{ paddingHorizontal: 10, }} color='#8395a7' />
            <TextInput placeholderTextColor={'#8395a7'} placeholder='email Id' style={{ fontSize: 15, marginHorizontal: 5, flex: 1, color: '#c6c6c6' }} keyboardType='email-address' value={email} onChangeText={(email) => setEmail(email)} />
          </View>
          <View style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#8395a7',
            borderRadius: 50,
            padding: 10,
            marginTop: 20,
            alignItems: 'center',
          }}>
            <Ionicons name="ios-lock-closed-outline" size={14} style={{ paddingHorizontal: 10, }} color='#8395a7' />
            <TextInput placeholderTextColor={'#8395a7'} placeholder='password' style={{ fontSize: 15, marginHorizontal: 5, flex: 1, color: '#c6c6c6' }} secureTextEntry={visible} value={password} onChangeText={(password) => setPassword(password)} />
            <TouchableOpacity onPress={() => {
              setVisible(!visible)
              setShow(!show)
            }}>
              <Ionicons
                name={show === false ? "md-eye" : "md-eye-off"}
                size={18}
                style={{ marginRight: 10 }}
                color="#8395a7"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.red}>{message}</Text>
          <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
            forgetPassword()
          }}>
            <Text style={{ fontWeight: '700', color: '#6c63FF', textAlign: "center" }}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', alignItems: 'center', }}>
            <TouchableOpacity style={{
              elevation: 10,
            }}
              onPress={() => handleLogin()}
            >
              <LinearGradient colors={['#5f2c82', '#49a09d']}
                style={{
                  borderRadius: 50,
                  marginTop: 20,
                  width: 200,
                  paddingVertical: 10,
                }}>
                <Text style={{ textAlign: 'center', color: '#fff' }}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{ color: '#8395a7', marginTop: 20 }}>Or, Sign in with</Text>
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
            <Text style={{ fontWeight: '200', color: '#8395a7' }}>New user?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ color: '#6c33FF', fontWeight: 'bold', marginHorizontal: 10 }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default LoginScreen;



const styles = StyleSheet.create({
  red: {
    color: "red",
    fontSize: 10,
  },
})

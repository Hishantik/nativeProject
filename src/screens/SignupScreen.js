import React, { useState } from 'react';
import { Image,View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { firebase } from '../../config.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SignupImg from '../../assets/Svg/bg9-2.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Facebook from '../../assets/Socials/icons8-facebook.svg';
import Google from '../../assets/Socials/icons8-google.svg';
import Twitter from '../../assets/Socials/icons8-twitter.svg';
import { StackActions } from '@react-navigation/native';


const SignUp = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of birth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [show, setShow] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [shown, setShown] = React.useState(false);
  const [showable, setShowable] = React.useState(true);
  const [message, setMessage] = useState("");


  const handleSignup = async () => {
    try {
      if (email.length > 0 && password.length > 0 && userName.length > 0) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userData = {
          id: user.user.uid,
          userName: userName,
          email: email,
          dobLabel: dobLabel,
        }
        await firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid).set(userData);
        await firebase.auth().currentUser.sendEmailVerification();
        await firebase.auth().signOut();
        alert('Verification mail sent');
        console.log(user);
        setMessage('');

        navigation.dispatch(StackActions.replace('LoginScreen'));
      }
      else {
        alert('Please fill all fields');
      }
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
  }
  // const [confirmPassword, setConfirmPassword] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDobLabel(date.toDateString());
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', marginVertical: -40 }}>
          <Image style={{
            width:300,
            height:300,
            marginTop:30,
            marginLeft:20,
          }} source={require('../../assets/Png/SignUp.png')}/>
        </View>
        <Text style={{
          marginTop: 10,
          fontSize: 26,
          fontWeight: '500',
        }}>Register</Text>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 10
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
        <Text style={{ textAlign: 'center', color: '#666', marginVertical: 10 }}>or Sign up with email id</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Entypo name='user' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder="username" style={{ flex: 1 }} onChangeText={(userName) => setUserName(userName)} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Entypo name='email' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder="email Id" style={{ flex: 1 }} keyboardType='email-address' onChangeText={(email) => setEmail(email)} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Ionicons name='ios-lock-closed-outline' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder="password" style={{ flex: 1 }} secureTextEntry={visible} onChangeText={(password) => setPassword(password)} />
          <TouchableOpacity onPress={() => {
            setVisible(!visible)
            setShow(!show)
          }}>
            <Ionicons
              name={show === false ? "md-eye" : "md-eye-off"}
              size={18}
              style={{ marginRight: 10 }}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Ionicons name='ios-lock-closed-outline' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder=" Confirm password" style={{ flex: 1 }} secureTextEntry={showable} onChangeText={(password) => setPassword(password)} />
          <TouchableOpacity onPress={() => {
            setShowable(!showable)
            setShown(!shown)
          }}>
            <Ionicons
              name={shown === false ? "md-eye" : "md-eye-off"}
              size={18}
              style={{ marginRight: 10 }}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <FontAwesome name='birthday-cake' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
            <Text style={{ color: '#666' }} onChange={(dobLabel) => setDobLabel(dobLabel)}>{dobLabel}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={{ color: "red", fontSize: 10 }}>{message}</Text>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={{
            elevation: 10,
            marginTop: 10,
            borderRadius: 50,
            backgroundColor: '#6c63FF',
            paddingVertical: 10,
            width: '50%'
          }}>
            <Text style={{
              flex: 1,
              textAlign: 'center',
              color: '#fff',
            }} onPress={() => handleSignup()}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 15
        }}>
          <Text style={{ fontWeight: '200', color: '#666' }}>Already a user?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#6363FF', fontWeight: 'bold', marginHorizontal: 10, textAlign: 'center' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;








// const styles=StyleSheet.create({
//   red:{
//     color:red,
//     fontSize:4,
//   }
// })

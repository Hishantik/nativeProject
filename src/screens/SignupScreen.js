import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SignupImg from '../../assets/Svg/bg9-2.svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Facebook from '../../assets/Socials/icons8-facebook.svg';
import Google from '../../assets/Socials/icons8-google.svg';
import Twitter from '../../assets/Socials/icons8-twitter.svg';
import { AuthContext } from '../Context/AuthContext';


const SignUp = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of birth');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword,setConfirmPassword] = useState(null);
  const { signup } = useContext(AuthContext);

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
          <SignupImg width={300} height={300} style={{ marginTop: 30, marginLeft: 20, }} />
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
          <TextInput placeholder="username" style={{ flex: 1 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Entypo name='email' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder="email Id" style={{ flex: 1 }} keyboardType='email-address' onChangeText={(email)=>setEmail(email)}/>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Ionicons name='ios-lock-closed-outline' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder="password" style={{ flex: 1 }} secureTextEntry={true} onChangeText={(password)=>setPassword(password)} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <Ionicons name='ios-lock-closed-outline' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TextInput placeholder=" Confirm password" style={{ flex: 1 }} secureTextEntry={true} onChangeText={(password)=>setPassword(password)} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 50, padding: 10, marginVertical: 10 }}>
          <FontAwesome name='birthday-cake' size={14} style={{ paddingHorizontal: 10 }} color='#666' />
          <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
            <Text style={{ color: '#666' }}>{dobLabel}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={{ elevation: 10, marginTop: 20, borderRadius: 50, backgroundColor: '#6633FF', paddingVertical: 10, width: '50%' }}>
            <Text style={{ textAlign: 'center', color: '#fff', }} onPress={() => signup(email, password)}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10
        }}>
          <Text style={{ fontWeight: '200', color: '#666' }}>Already a user?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#6633FF', fontWeight: 'bold', marginHorizontal: 10, textAlign: 'center' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;

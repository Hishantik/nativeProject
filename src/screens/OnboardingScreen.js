import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackActions } from '@react-navigation/native';

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '50%',
    borderRadius: 50,
  }} {...props} >
    <Octicons name="skip" size={30} />
  </TouchableOpacity>
);

const Dot = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#57606f' : '#a4b0be';
  return (
    <View
      style={{
        width: 10,
        height: 6,
        borderRadius: 100,
        marginHorizontal: 3,
        backgroundColor
      }} />
  );
}

const Next = ({ ...props }) => (
  <TouchableOpacity style={{
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: '50%',
    borderRadius: 50
  }} {...props} >
    <MaterialIcons name="navigate-next" size={40} />
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: '50%',
    borderRadius: 50
  }} {...props} >
    <MaterialIcons name="done" size={30} />
  </TouchableOpacity>
);


const Onboard = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dot}
      onSkip={() => navigation.dispatch(StackActions.replace("Main"))}
      onDone={() => navigation.dispatch(StackActions.replace("Main"))}
      pages={[
        {
          backgroundColor: '#6c63ff',
          image: <Image style={{
            width: 300,
            height: 300,
            marginBottom: 60,
          }} source={require('../../assets/Png/deku1.png')} />,
          title: <Text style={{
            position: 'relative',
            bottom: 80,
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: -50
          }}>Onboarding</Text>,
          subtitle: <Text style={{

          }}>Done with React Native Onboarding Swiper</Text>,
        },
        {
          backgroundColor: '#ffc100',
          image: <Image style={{
            width: 300,
            height: 300,
            marginBottom: 60,
          }} source={require('../../assets/Png/deku2.png')} />,
          title: <Text style={{
            position: 'relative',
            bottom: 80,
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: -50,
          }}>Onboarding</Text>,
          subtitle: <Text style={{

          }}>Done with React Native Onboarding Swiper</Text>,
        },
        {
          backgroundColor: '#92e3a9',
          image: <Image style={{
            width: 300,
            height: 300,
            marginBottom: 60,
          }} source={require('../../assets/Png/deku3.png')} />,
          title: <Text style={{
            position: 'relative',
            bottom: 80,
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: -50,
          }}>Onboarding</Text>,
          subtitle: <Text style={{

          }}>Done with React Native Onboarding Swiper</Text>,
        }
      ]}
    />
  );
}


export default Onboard;

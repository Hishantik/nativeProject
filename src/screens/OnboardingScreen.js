import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';
import MaskedView from '@react-native-masked-view/masked-view';

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '50%',
    borderRadius: 50,
  }} {...props} >
    <Octicons name="skip" size={30} color={'#c6c6c6'} />
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
    <MaterialIcons name="navigate-next" color={'#c6c6c6'} size={40} />

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
    <MaterialIcons name="done" color={'#c6c6c6'} size={30} />
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
          backgroundColor: '#3d3d3d',
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
          }}>Realtime tracking</Text>,
          subtitle: <Text style={{
          }}>Get a realtime crypto market price list and data.</Text>,
        },
        {
          backgroundColor: '#3d3d3d',
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
          }}>Charting</Text>,
          subtitle: <Text style={{
          }}>Keep track of loss and gain in the market.</Text>,
        },
        {
          backgroundColor: '#3d3d3d',
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
          }}>Calculator</Text>,
          subtitle: <Text style={{

          }}>Calculate the current price of desired coin.</Text>,
        }
      ]}
    />
  );
}


export default Onboard;

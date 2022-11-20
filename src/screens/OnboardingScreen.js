import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  backgroundColor = selected ? '#6633ff' : '#C0C0C0';
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
      onSkip={() => navigation.replace("Main")}
      onDone={() => navigation.navigate("Main")}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: 400, height: 280 }} source={require('../../assets/Png/undraw_Ethereum_re_0m68.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: 400, height: 250 }} source={require('../../assets/Png/undraw_Growth_analytics_re_pyxf.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: 400, height: 250 }} source={require('../../assets/Png/undraw_crypto_portfolio_2jy5.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        }
      ]}
    />
  );
}


export default Onboard;

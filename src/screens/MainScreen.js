import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import BitCoinImg from '../../assets/BitCoin.svg';
import { useFonts } from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const Main = ({ navigation }) => {
  const [loaded] = useFonts({
    Roboto: require('../../assets/fonts/Roboto-Black.ttf'),
    ZillaSlab: require('../../assets/fonts/ZillaSlab-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }
    }>
      <View style={{
        position: 'absolute',
        top: 140,
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: '#330033'
        }}>CRYPTO TRACKER</Text>
      </View>
      <BitCoinImg width={300} height={300} /> 
      <TouchableOpacity
        onPress={() => navigation.push('LoginScreen')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#6633FF',
          elevation: 20,
          padding: 20,
          width: '90%',
          borderRadius: 50,
          position: 'absolute',
          bottom: 130,
        }}>
        <Text style={{
          color: '#fff',
          fontWeight: 'bold',
          fontFamily: 'ZillaSlab',
          fontSize: 15,
        }}>
          Let's Proceed!
        </Text>
        <MaterialIcons name='arrow-forward-ios' size={22} color='#fff' />
      </TouchableOpacity>
    </SafeAreaView >
  );
}


export default Main;

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';



const Main = ({ navigation }) => {
  const [loaded] = useFonts({
    Roboto: require('../../assets/fonts/Roboto-Black.ttf'),
    ZillaSlab: require('../../assets/fonts/ZillaSlab-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }
  return (
    <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
      }>
        <View style={{
          position: 'absolute',
          top: 140,
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#c6c6c6',
            marginBotton: 20
          }}>CRYPTODECK </Text>
        </View>
        <Image source={require('../../assets/Png/Bitcoin-bro.png')} style={{ height: 300, width: 300 }} />
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace('LoginScreen'))}
          style={{
            marginTop: 50,
            width: '90%',
            borderRadius: 50,
          }}>
          <LinearGradient colors={['#5f2c82', '#49a09d']} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 20,
            padding: 20,
            borderRadius: 50,
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
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView >
      <View style={styles.developers}>
        <Text style={styles.devhead}>Made with ❣️  by ::</Text>
        <Text style={styles.developerslord}> Hishantik Sarkar & Dipankar das</Text>
      </View>

    </LinearGradient>
  );
}


export default Main;




const styles = StyleSheet.create({
  developers: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  devhead: {
    color: '#ffffff',
    textDecorationLine: "underline",
    fontWeight: 'bold',

  },
  developerslord: {
    color: '#ffffff',
    fontWeight: '200'
  }


})

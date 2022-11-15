
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import BitCoinImg from './assets/BitCoin.svg';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from 'expo-font';
// import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
// import MainTabScreen from './screens/MainTab';
// import ProfileScreen from './screens/Profile';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const Main = ({ navigation }) => {
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Black.ttf'),
    // ZillaSlab: require('./assets/fonts/ZillaSlab-Regular.ttf')
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
        }}>CRYPTOCHART</Text>
      </View>
      <BitCoinImg width={300} height={300} />
      <TouchableOpacity
        onPress={() => navigation.push('HomeScreen')}
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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Main} name="Main" options={{
          headerShown: false,
        }} />
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



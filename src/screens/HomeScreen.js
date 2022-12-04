import React, { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ImageBackground, BackHandler } from 'react-native';
import axios from "axios";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { getMarketData } from '../../apiServices/Services';
import MaskedView from '@react-native-masked-view/masked-view';
import MarketScreen from '../../Components/Market';
import { LinearGradient } from 'expo-linear-gradient';
import { FlashList } from '@shopify/flash-list';
import { TextInput } from 'react-native-gesture-handler';





function HomeScreen({ navigation }) {
  const [coinData, setCoinData] = useState([]);
  const [data, setData] = useState()
  const snapPoints = useMemo(() => ['40%'], []);
  const [coin, setCoin] = useState("bitcoin");
  const [period, setPeriod] = useState(30);
  const [selectedCoinData, setSelectedCoinData] = useState(null);





  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setCoinData(marketData);
    }

    fetchMarketData();
  }, [])


  useEffect(
    () => {
      getData()
    },
    [coin, period]
  )


  async function getData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=inr&days=${period}`
      )
      const formatData = response.data.prices.map(function(i) {
        return {
          x: i[0],
          y: i[1]
        }
      })
      setData(formatData)
    } catch (error) {
      console.log(error);
    }
  }
 


  return (
    <LinearGradient
      colors={['#232526', '#414345']}
      style={{ flex: 1 }}
    >
      < SafeAreaView style={{
        flex: 1,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          justifyContent: 'space-around',
        }}>
          <View style={{
            marginTop: 30
          }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}>
              <MaskedView maskElement={<Icon name="ios-menu" size={40} style={{ backgroundColor: 'transparent' }} />}>
                <LinearGradient colors={['#5f2c82', '#49a09d']}>
                  <Icon name="ios-menu" size={40} style={{ opacity: 0 }} />
                </LinearGradient>
              </MaskedView>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: 'row',
            marginRight: 80,
          }}>
            <Image style={{
              width: 30,
              height: 30,
            }} source={require('../../assets/Png/6c63ff-logo.png')} />
            <MaskedView maskElement={
              <Text style={{
                marginLeft: 10,
                backgroundColor: "transparent",
                fontWeight: "bold",
                fontSize: 15
              }}>Crypto Tracker</Text>
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Text style={{
                  marginLeft: 10,
                  opacity: 0,
                  fontWeight: "bold",
                  fontSize: 15
                }}>Crypto Tracker</Text>
              </LinearGradient>
            </MaskedView>
          </View>
        </View>
        <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, }}>
          <Text style={{
            fontSize: 20,
            color: '#fff',
            fontWeight: '100'
          }}>Available Markets</Text>
          <TouchableOpacity>
            <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent' }}>See all</Text>}>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Text style={{ opacity: 0 }}>See all</Text>
              </LinearGradient>
            </MaskedView>
          </TouchableOpacity>
        </View>
        <View style={{
          marginVertical: 5,
          marginBottom: 20,
          marginHorizontal: 20,
          borderRadius: 50,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FlashList
            data={coinData}
            horizontal={true}
            keyExtractor={(item) => item.id}
            estimatedItemSize={142}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                elevation: 30
              }}
                onPress={() => {
                  setCoin(item.id);
                  setSelectedCoinData(item);
                }}>
                <LinearGradient colors={['#5f2c82', '#49a09d']}
                  style={{
                    borderRadius: 14,
                    marginHorizontal: 15,
                    marginTop: 2,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={{ width: 17, height: 17 }} />
                    <Text style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      marginLeft: 5
                    }}>{item.name}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{
          paddingVertical: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15
        }}>

          <View style={{
            width: '70%',
            borderWidth: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 50,
            borderColor: '#C6C6C6',
            marginLeft: 20,
            paddingHorizontal: 25,
            paddingVertical: 8,
          }}>
            <TextInput placeholder='search' style={{ color: '#C6C6C6', flex: 1 }} />
            <MaskedView maskElement={<Icon name="search" size={20} style={{ backgroundColor: 'transparent' }} />}>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Icon name="search" size={20} style={{ opacity: 0 }} />
              </LinearGradient>
            </MaskedView>
          </View>
          <TouchableOpacity onPress={() => openModal()} >
            <LinearGradient colors={['#5f2c82', '#49a09d']} style={{ pading: 20, borderRadius: 50, elevation: 50 }}>
              <LinearGradient colors={['#232526', '#414345']} style={{ padding: 15, borderRadius: 50, }}>
                <MaskedView maskElement={<FontAwesome name='line-chart' size={23} style={{ backgroundColor: 'transparent' }} />}>
                  <LinearGradient colors={['#5f2c82', '#49a09d']}>
                    <FontAwesome name='line-chart' size={23} style={{ opacity: 0 }} />
                  </LinearGradient>
                </MaskedView>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <MarketScreen />
      </SafeAreaView >
    </LinearGradient>
  );
}

export default HomeScreen;








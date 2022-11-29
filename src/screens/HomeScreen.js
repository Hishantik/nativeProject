import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
// import Chart from '../../Components/Chart';
import axios from "axios";
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { getMarketData } from '../../apiServices/Services';





function HomeScreen({ navigation }) {
  const [coinData, setCoinData] = useState([]);
  const [data, setData] = useState()
  const [coin, setCoin] = useState("bitcoin");
  const [period, setPeriod] = useState(30);

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
      console.log(formatData)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff',
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TouchableOpacity style={{
          marginLeft: 20,
          marginTop: 20
        }}
          onPress={() => navigation.openDrawer()}>
          <Icon name="ios-menu" size={32} />
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image style={{
            width: 30,
            height: 30,
            marginLeft: 65
          }} source={require('../../assets/Png/6c63ff-logo.png')} />
          <Text style={{
            marginLeft: 10,
            color: "#6c63ff",
            fontWeight: "bold",
            fontSize: 15
          }}>Crypto Tracker</Text>
        </View>
      </View>
      <View style={{
        width: '90%',
        borderWidth: 3,
        flexDirection: 'row',
        borderRadius: 50,
        borderColor: '#C6C6C6',
        marginTop: 20,
        marginLeft: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
      }}>
        <Icon name="search" size={22} color='#C6C6C6' style={{
          marginRight: 15,
        }} />
        <TextInput placeholder='search' style={{ flex: 1 }} />
      </View>
      <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, }}>
        <Text style={{
          fontSize: 20,
        }}>Available Markets</Text>
        <TouchableOpacity>
          <Text style={{ color: '#6c63ff' }}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        marginVertical: 10,
        marginBottom: 20,
        marginHorizontal: 30
      }}>
        <FlatList
          data={coinData}
          numColumns={1}
          horizontal={true}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={{
              marginHorizontal: 15,
              backgroundColor: '#6c63ff',
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }} onPress={() => {
              setCoin(item.id);
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: 17, height: 17 }} />
                <Text style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  marginLeft: 5
                }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginVertical: -20 }}>
        <View style={{ width: 700, marginLeft: 20 }}>
          <VictoryChart theme={VictoryTheme.material} width={700}>
            <VictoryLine
              animate
              style={{
                data: {
                  stroke: "#a5b1c2",
                  strokeWidth: 2
                }
              }}
              width={800}
              height={200}
              data={data}
            />
          </VictoryChart>
        </View>
      </ScrollView>
      <View style={styles.timeWrapper}>
        <TouchableOpacity style={styles.time} onPress={() => setPeriod(1)} ><Text style={{ color: '#fff' }}>1 day</Text></TouchableOpacity>
        <TouchableOpacity style={styles.time} onPress={() => setPeriod(7)} ><Text style={{ color: '#fff' }}>1 week</Text></TouchableOpacity>
        <TouchableOpacity style={styles.time} onPress={() => setPeriod(30)} ><Text style={{ color: '#fff' }}>1 month</Text></TouchableOpacity>
        <TouchableOpacity style={styles.time} onPress={() => setPeriod(365)} ><Text style={{ color: '#fff' }}>1 year</Text></TouchableOpacity>
      </View>


    </SafeAreaView >
  );
}

export default HomeScreen;



const styles = StyleSheet.create({
  Coinsec: {
    width: '100%',
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center",
  },
  // textTime:{
  //   color:"#fff",
  // },
  crypto: {
    width: 150,
    height: 150,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  timeWrapper: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  coinBtn: {
    width: 50,
    height: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  time: {
    backgroundColor: "#6c63ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    fontWeight: "bold",
    borderRadius: 50,
    fontSize: 4,
  },
  button: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
    elevation: 25,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 5 },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  }
});







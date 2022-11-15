import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import axios from "axios";
import { VictoryLine } from 'victory-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';





function HomeScreen() {
  const [data, setData] = useState()
  const [coin, setCoin] = useState("bitcoin")
  const [period, setPeriod] = useState(30)

  useEffect(
    () => {
      getData()
    },
    [coin, period]
  )

  async function getData() {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${period}`
      )
      const formatData = response.data.prices.map(function(i) {
        return {
          x: i[0],
          y: i[1]
        }
      })
      setData(formatData)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor:'#fff',
    }}>
      <ScrollView style={{
        marginTop:30,
        padding: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>Hi, User</Text>
          <ImageBackground
            source={{ uri: 'https://user-images.githubusercontent.com/60609786/200855727-22e055e7-ca4c-453c-b973-c7bdd1c56d57.png' }}
            style={{ width: 35, height: 35, }}
            imageStyle={{ borderRadius: 25 }} />
        </View>
        <View style={{
          borderWidth:1,
          flexDirection:'row',
          borderRadius:50,
          borderColor:'#6633FF',
          marginTop:20,
          padding:10,
        }}>
          <Feather name="search" size="20" color="#6633FF" style={{
            // marginRight:5,
          }}/> 
          <TextInput placeholder='search' />
        </View>
        {/* <View style={styles.coins}> */}
          <View style={styles.Coinsec}>
            <TouchableOpacity style={[styles.button, coin === "bitcoin" ? styles.underline : null]} onPress={() => setCoin("bitcoin")}>
              <Image style={styles.coinBtn} source={require("../assets/Bitcoin.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, coin === "ethereum" ? styles.underline : null]} onPress={() => setCoin("ethereum")}>
              <Image style={styles.coinBtn} source={require("../assets/Ethereum.png")} />
            </TouchableOpacity>
          {/* </View> */}
          <View style={styles.line}>
            <VictoryLine
              style={{
                data: {
                  stroke: "#000",
                  strokeWidth: 2
                }
              }}
              width={400}
              height={200}
              data={data}
            />
          </View>
        </View>
        <View style={styles.gap} />
        <View style={styles.timeWrapper}>
          <TouchableOpacity color="#000" style={[styles.time, period === 1 ? styles.underline : null]} onPress={() => setPeriod(1)} ><Text>1 D</Text></TouchableOpacity>
          <TouchableOpacity color="#000" style={[styles.time, period === 7 ? styles.underline : null]} onPress={() => setPeriod(7)} ><Text>1 W</Text></TouchableOpacity>
          <TouchableOpacity color="#000" style={[styles.time, period === 30 ? styles.underline : null]} onPress={() => setPeriod(30)} ><Text>1 M</Text></TouchableOpacity>
          <TouchableOpacity color="#000" style={[styles.time, period === 365 ? styles.underline : null]} onPress={() => setPeriod(365)} ><Text>1 Y</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  crypto: {
    width: 150,
    height: 150,
    // position:'absolute',
    // top:99,
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  timeWrapper: {
    marginTop: 10,
    width: '100%',
    position: "absolute",
    bottom: 150,
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
  line: {
    marginTop: 20,
    borderRadius: 14,
    width: '100%',
  },
  time: {
    color: "#fff",
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    elevation: 20,
    fontWeight: "bold",
    borderRadius: 50,
    margin: 30,
    fontSize: 4,
  },
  // header: {
  // color: "#000",
  // position: "absolute",
  // top: 50,
  // fontSize: 30,
  // fontWeight: "bold"
  // },
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



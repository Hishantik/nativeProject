import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from "axios";
import { VictoryLine } from 'victory-native';





function Dashboard() {
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
    <View style={styles.container}>
      <Text style={styles.header}>DekuChart</Text>
      <Image source={{ uri: 'https://user-images.githubusercontent.com/60609786/200855727-22e055e7-ca4c-453c-b973-c7bdd1c56d57.png' }} style={styles.crypto} />
      <View style={styles.gap} />
      <View style={styles.coins}>
        <View style={styles.Coinsec}>
          <Button title='Bitcoin' color="#000" style={[styles.title, coin === "bitcoin" ? styles.underline : null]}
            onPress={() => setCoin("bitcoin")} />
          <Button title='Ethereum' color="#000" style={[styles.title, coin === "ethereum" ? styles.underline : null]}
            onPress={() => setCoin("ethereum")} />
        </View>
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
        <Button title="1 Day" color="#000" style={[styles.time, period === 1 ? styles.underline : null]} onPress={() => setPeriod(1)} />
        <Button title="1 Weelk"  color="#000" style={[styles.time, period === 7 ? styles.underline : null]} onPress={() => setPeriod(7)} />
        <Button title="1 Month"  color="#000" style={[styles.time, period === 30 ? styles.underline : null]} onPress={() => setPeriod(30)} />
        <Button title="1 Year"  color="#000" style={[styles.time, period === 365 ? styles.underline : null]} onPress={() => setPeriod(365)} />
      </View>
    </View>
  )
}

export default Dashboard;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  space: {
    width: 20
  },
  Coinsec: {
    width: '100%',
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center"
  },
  // gap: {
  //   margin: 20,
  //   height: 20
  // },
  crypto: {
    // position: "absolute",
    // top: 128,
    width: 150,
    height: 150
  },
  title: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  timeWrapper: {
    marginTop: 40,
    width: '100%',
    // position: "absolute",
    // bottom: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around'
  },
  coins: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  line: {
    marginTop: 50
  },
  time: {
    color: "#000",
    margin: 60,
    fontSize: 4,
  },
  header: {
    //borderstyle : "1px solid white", 
    color: "#000",
    position: "absolute",
    top: 20,
    fontSize: 30,
    fontWeight: "bold"
  },
  underline: { textDecorationLine: "underline" }
});



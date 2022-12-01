import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import axios from "axios";
import { useSharedValue } from 'react-native-reanimated';

export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, id, logoUrl, name, priceChangePercentage7d, sparkline }) => {
  console.log(id)

  const [data, setData] = useState()
  const [coin, setCoin] = useState("bitcoin");
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const value = priceChangePercentage7d > 0 ? "↑" : "↓";
  const latestCurrentPrice = useSharedValue(currentPrice);


  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`
      )
      const formatData = response.data.prices.map(function(i) {
        return {
          timestamp: i[0],
          value: i[1]
        }
      })
      setData(formatData)
      console.log(formatData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
    latestCurrentPrice.value = currentPrice;
  }, [currentPrice])

  const formatINR = value => {
    'worklet';
    if (value === '') {
      return `₹ ${latestCurrentPrice.value}`;
    }
    const formattedValue = `₹ ${parseFloat(value).toFixed(2)}`
    return formattedValue;
  };

  return (
    <LineChart.Provider data={data}>
      < View style={styles.chartWrapper} >
        <View style={styles.coinInfoWrapper}>
          <View style={styles.coinInfo}>
            <Image source={{ uri: logoUrl }} style={styles.coinImage} />
            <Text style={styles.coinTitle}>{name}({symbol.toUpperCase()})</Text>
          </View>
          <Text style={styles.coinTitle}>7 days</Text>
        </View>
        <View style={styles.belowTitle}>
          <Text style={styles.Price}>₹{currentPrice}</Text>
          <Text style={[styles.priceChange, { color: priceChangeColor }]}>{value} {priceChangePercentage7d.toFixed(2)}%</Text>
        </View>
        <View>
          <LineChart>
            <LineChart.Path />
            <LineChart.CursorLine />
            <LineChart.CursorCrosshair>
              <LineChart.Tooltip />
              <LineChart.Tooltip position="bottom">
                <LineChart.DatetimeText />
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair >
          </LineChart>
        </View>
      </View >
    </LineChart.Provider>
  );
}

export default SparkLine;



const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16
  },
  coinInfoWrapper: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  coinTitle: {
    fontSize: 14,
    color: '#a9abb1'
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 6
  },
  belowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20

  },
  Price: {
    fontWeight: 'bold',
    color: "#000",
    fontSize: 20
  },
  priceChange: {
    fontSize: 15,
  },
})

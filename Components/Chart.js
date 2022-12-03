import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { useSharedValue } from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, id, logoUrl, name, priceChangePercentage7d, sparkline }) => {
  console.log(id)

  const [data, setData] = useState()
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
    // latestCurrentPrice.value = currentPrice;
  }, [currentPrice])


  return (
    <LinearGradient colors={['#232526', '#414345']}>
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

            <MaskedView maskElement={
              <LineChart.PriceText
                format={(value) => {
                  'worklet';
                  return value.formatted ? `₹ ${value.formatted.replace(/\d(?=(\d{5})+\.)/g, '$&,')} INR` : `₹ ${currentPrice.toLocaleString('en-IN', { currency: 'INR' })} INR`;
                }}
                style={{ backgroundColor: 'transparent' }} />
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <LineChart.PriceText
                  format={(value) => {
                    'worklet';
                    return value.formatted ? `₹ ${value.formatted.replace(/\d(?=(\d{5})+\.)/g, '$&,')} INR` : `₹ ${currentPrice.toLocaleString('en-IN', { currency: 'INR' })} INR`;
                  }}
                  style={{
                    fontWeight: 'bold',
                    opacity: 0,
                    fontSize: 20
                  }} />
              </LinearGradient>
            </MaskedView>
            <Text style={[styles.priceChange, { color: priceChangeColor }]}>{value} {priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
          <View style={{
            marginTop: 20
          }}>
            <LineChart width={SIZE} height={SIZE / 2}>
              <LineChart.Path color={priceChangeColor} width={2} />
              <LineChart.Gradient color="black" />
              <LineChart.CursorLine color={priceChangeColor} />
              <LineChart.CursorCrosshair color={priceChangeColor}>
                <LineChart.Tooltip position="top">
                  <LineChart.PriceText
                    style={{ color: '#a9abb1' }}
                    format={(value) => {
                      'worklet';
                      return value.formatted ? `₹ ${value.formatted.replace(/\d(?=(\d{5})+\.)/g, '$&,')} INR` : `₹ ${currentPrice.toLocaleString('en-IN', { currency: 'INR' })} INR`;
                    }}
                  />
                </LineChart.Tooltip>
                <LineChart.Tooltip position="bottom">
                  <LineChart.DatetimeText style={{ color: '#a9abb1' }} />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair >
            </LineChart>
          </View>
        </View >
      </LineChart.Provider >
    </LinearGradient>
  );
}

export default SparkLine;



const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16
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
  priceChange: {
    fontSize: 15,
  },
})

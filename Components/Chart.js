import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaskedView from '@react-native-masked-view/masked-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, id, logoUrl, name, priceChangePercentage7d }) => {

  const [data, setData] = useState();
  const [period, setPeriod] = useState(7);
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const value = priceChangePercentage7d > 0 ? "↑" : "↓";
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOption, setShowOption] = useState(false);
  // const latestCurrentPrice = useSharedValue(currentPrice);

  let timePeriod = [
    {
      id: 1,
      day: "1 Day",
      period: 1,
    },
    {
      id: 2,
      day: "1 Week",
      period: 7,
    },
    {
      id: 3,
      day: "1 Month",
      period: 30,
    },
    {
      id: 4,
      day: "1 Year",
      period: 365,
    }
  ]


  const onSelect = (item) => {
    setPeriod(item.period)
    setSelectedItem(item)
  }

  const onSelectedItem = (item) => {
    setShowOption(false)
    onSelect(item)
  }


  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${period}`
      )
      const formatData = response.data.prices.map(function(i) {
        return {
          timestamp: i[0],
          value: i[1]
        }
      })
      setData(formatData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
    // latestCurrentPrice.value = currentPrice;
  }, [period])


  return (
    <LinearGradient colors={['#232526', '#414345']}>
      <LineChart.Provider data={data}>
        < View style={styles.chartWrapper} >
          <View style={styles.coinInfoWrapper}>
            <View style={styles.coinInfo}>
              <Image source={{ uri: logoUrl }} style={styles.coinImage} />
              <Text style={[styles.coinTitle, { width: 210 }]}>{name}({symbol.toUpperCase()})</Text>
            </View>
            <View style={{ marginRight: 10, }}>
              <TouchableOpacity onPress={() => setShowOption(!showOption)}>
                <LinearGradient colors={['#232526', '#414345']} style={{ borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, elevation: 50, width: 120, justifyContent: 'center' }}>
                  <Text style={styles.coinTitle}>{!!selectedItem ? selectedItem.day : '1 Week'}</Text>
                  <MaskedView maskElement={<AntDesign name='downcircleo' size={20} style={{ backgroundColor: 'transparent', }} />}>
                    <LinearGradient colors={['#5f2c82', '#49a09d']}>
                      <AntDesign name='downcircleo' size={20} style={{ opacity: 0, transform: [{ rotate: showOption ? '180deg' : '0deg' }] }} />
                    </LinearGradient>
                  </MaskedView>
                </LinearGradient>
              </TouchableOpacity>
              {showOption && (
                <View style={{
                  zIndex: 1,
                  position: 'absolute',
                  top: 33, right: 5,
                  width: 105,
                  borderBottomStartRadius: 18,
                  backgroundColor: '#414345',
                  borderBottomRightRadius: 18
                }}>
                  {timePeriod.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => onSelectedItem(item)}
                      >
                        <Text style={[styles.coinTitle, { position: 'relative', zIndex: 1 }]}>{item.day}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}
            </View>
          </View>
          <View style={styles.belowTitle}>

            <MaskedView maskElement={
              <LineChart.PriceText
                format={(value) => {
                  'worklet';
                  return value.formatted ? `₹ ${value.formatted.replace(/\d(?=(\d{5})+\.)/g, '$&,')} INR` : `₹ ${currentPrice.toLocaleString('en-IN', { currency: 'INR' })} INR`;
                }}
                style={{
                  backgroundColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: 20
                }} />
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,
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
  dropDrop: {
    borderRadius: 30
  },
  priceChange: {
    fontSize: 15,
  },
})

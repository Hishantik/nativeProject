import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaskedView from '@react-native-masked-view/masked-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Period from './period';

export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, id, logoUrl, name, priceChangePercentage7d }) => {

  const [data, setData] = useState();
  const [period, setPeriod] = useState(7);
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOption, setShowOption] = useState(false);
  // const latestCurrentPrice = useSharedValue(currentPrice);



  const onSelect = (item) => {
    setPeriod(item.period)
    setSelectedItem(item)
  }

  const onSelectedItem = (item) => {
    setShowOption(false)
    onSelect(item)
  }


  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (currentPrice < 1) {
        return `₹ ${currentPrice.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')} INR`;
      }
      return `₹${currentPrice.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')} INR`;
    }
    if (currentPrice < 1) {
      return `₹${parseFloat(value).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')} INR`;
    }
    return `₹${parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')} INR`;
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
                <LinearGradient colors={['#232526', '#414345']} style={{ borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, elevation: 50, width: 120, justifyContent: 'center', zIndex: 1 }}>
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
                  top: 33, right: 9,
                  width: 100,
                  borderBottomStartRadius: 18,
                  backgroundColor: '#414345',
                  borderBottomRightRadius: 18
                }}>
                  {Period.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => onSelectedItem(item)}
                      >
                        <Text style={[styles.coinTitle, { position: 'relative', zIndex: 1, }]}>{item.day}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}
            </View>
          </View>
          <View style={styles.belowTitle}>
            <LineChart.PriceText
              format={formatCurrency}
              style={{
                fontWeight: 'bold',
                color: '#c7c6c6',
                fontSize: 20
              }} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              {
                priceChangePercentage7d > 0 ?
                  <MaterialIcons name='arrow-drop-up' size={26} color={priceChangeColor} /> :
                  <MaterialIcons name='arrow-drop-down' size={26} color={priceChangeColor} />
              }

              <Text style={[styles.priceChange, { color: priceChangeColor }]}> {priceChangePercentage7d.toFixed(2)}%</Text>
            </View>
          </View>
          <View style={{
            marginTop: 12
          }}>
            <LineChart width={SIZE} height={SIZE / 2}>
              <LineChart.Path color={priceChangeColor} width={2} />
              <LineChart.Gradient color="black" />
              <LineChart.CursorLine color={priceChangeColor} />
              <LineChart.CursorCrosshair color={priceChangeColor}>
                <LineChart.Tooltip position="top">
                  <LineChart.PriceText
                    style={{
                      backgroundColor: '#000',
                      color: '#a9abb1',
                      borderRadius: 5,
                      paddingHorizontal: 4,
                      fontWeight: 'bold',
                    }}
                    format={formatCurrency}
                  />
                </LineChart.Tooltip>
                <LineChart.Tooltip position="bottom">
                  <LineChart.DatetimeText
                    locale='en-IN'
                    options={{
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    }}
                    style={{
                      backgroundColor: '#000',
                      color: '#a9abb1',
                      borderRadius: 5,
                      paddingHorizontal: 4,
                      fontWeight: 'bold',
                    }} />
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

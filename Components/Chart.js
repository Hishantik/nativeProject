import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, logoUrl, name, priceChangePercentage7d, sparkline }) => {


  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const value = priceChangePercentage7d > 0 ? "↑" : "↓";
  const latestCurrentPrice = useSharedValue(currentPrice);


  useEffect(() => {
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
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>
        <View style={styles.coinInfoWrapper}>
          <View style={styles.coinInfo}>
            <Image source={{ uri: logoUrl }} style={styles.coinImage} />
            <Text style={styles.coinTitle}>{name}({symbol.toUpperCase()})</Text>
          </View>
          <Text style={styles.coinTitle}>7 days</Text>
        </View>
        <View style={styles.belowTitle}>
          <ChartYLabel
            format={formatINR}
            style={styles.Price}
          />
          {/* <Text style={styles.Price}>₹{currentPrice}</Text> */}
          <Text style={[styles.priceChange, { color: priceChangeColor }]}>{value} {priceChangePercentage7d.toFixed(2)}%</Text>
        </View>
        <View style={styles.graph}>
          <ChartPath
            height={SIZE / 2}
            stroke={priceChangeColor}
            width={SIZE}
            strokeWidth={2}
            // selectedStrokeWidth={2}
          />
          <ChartDot style={{ backgroundColor: priceChangeColor }} />
        </View>
      </View>
    </ChartPathProvider>
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
  Price: {
    fontWeight: 'bold',
    color: "#000",
    fontSize: 20
  },
  priceChange: {
    fontSize: 15,
  },
})

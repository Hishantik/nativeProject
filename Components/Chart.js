import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// import { ChartDot, ChartPath, ChartPathProvider } from '@rainbow-me/animated-charts';

// export const { width: SIZE } = Dimensions.get('window');

const SparkLine = ({ currentPrice, symbol, logoUrl, name, priceChangePercentage7d, sparkline }) => {

  console.log(name)

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  return (
    <View style={styles.chartWrapper}>
      <View style={styles.coinInfoWrapper}>
        <View style={styles.coinInfo}>
          <Image source={{ uri: logoUrl }} style={styles.coinImage} />
          <Text style={styles.coinTitle}>{name}({symbol.toUpperCase()})</Text>
        </View>
        <Text style={styles.coinTitle}>7 days</Text>
      </View>
      <View style={styles.belowTitle}>
        <Text style={styles.Price}>₹{currentPrice}</Text>
        <Text style={[styles.priceChange, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
      </View>
      {/* <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} /> */}
      {/* <ChartDot style={{ backgroundColor: 'blue' }} /> */}
    </View>
  );
}

export default SparkLine;



const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16
  },
  coinInfoWrapper: {
    flexDirection: 'row',
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
    alignItems: 'center'

  },
  Price: {
    fontWeight: 'bold',
    fontSize: 20
  },
  priceChange: {
    fontSize: 15,

  }
})

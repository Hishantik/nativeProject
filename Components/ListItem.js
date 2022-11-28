import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl ,onPress}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        {/* left Side */}
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.coinNameWrapper}>
            <Text style={styles.coinName}>{name}</Text>
            <Text style={styles.coinAbbr}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        {/* right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.coinName}>₹{currentPrice.toLocaleString("en-IN", { currency: "INR" })}</Text>
          <Text style={[styles.coinAbbr, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(4)}%</Text>
        </View>
      </View>
    </TouchableOpacity >
  );
}

export default ListItem;

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
  image: {
    height: 48,
    width: 48,
  },
  coinNameWrapper: {
    marginLeft: 8
  },
  coinName: {
    fontSize: 15,
    fontWeight: '500',
  },
  coinAbbr: {
    fontsize: 8,
    marginTop: 2,
    color: "#a9abb1",
  }
})

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryLine } from 'victory-native';
import MaskedView from '@react-native-masked-view/masked-view';


const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress, sparkline }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const value = priceChangePercentage7d > 0 ? "↑" : "↓";
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.itemWrapper}>
        {/* left Side */}
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.coinNameWrapper}>
            <MaskedView maskElement={
              <Text style={[styles.coinName, { width: 85, fontWeight: 'bold', backgroundColor: 'transparent' }]}>{name}</Text>}>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Text style={[styles.coinName, { width: 85, fontWeight: '900', opacity: 0 }]}>{name}</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.coinAbbr}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View>
          <VictoryLine
            style={{
              data: {
                stroke: priceChangeColor,
                strokeWidth: 2
              }
            }}
            width={180}
            height={50}
            data={sparkline}
          />
        </View>
        {/* right side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.coinName}>₹{currentPrice.toLocaleString("en-IN", { currency: "INR" })}</Text>
          <Text style={[styles.coinAbbr, { color: priceChangeColor }]}>{value} {priceChangePercentage7d.toFixed(3)}%</Text>
        </View>
      </View>
        <View style={{
    height: StyleSheet.hairlineWidth,
      }}></View>
    </TouchableOpacity >
  );
}

export default ListItem;

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
  image: {
    height: 40,
    width: 40,
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

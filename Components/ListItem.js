import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VictoryLine } from 'victory-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress, sparkline }) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34c759' : '#ff3b30';
  const formattedCurrency = currentPrice.toString().replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.itemWrapper}>
        {/* left Side */}
        <View style={styles.leftWrapper}>
          <Image source={{ uri: logoUrl }} style={styles.image} />
          <View style={styles.coinNameWrapper}>
            <Text style={[styles.coinName, { width: 85, fontWeight: '900', }]}>{name}</Text>
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
          <Text style={[styles.coinName, { fontSize: 13 }]}>₹ {formattedCurrency}</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            {
              priceChangePercentage7d > 0 ?
                <MaterialIcons name='arrow-drop-up' size={26} color={priceChangeColor} /> :
                <MaterialIcons name='arrow-drop-down' size={26} color={priceChangeColor} />
            }
            <Text style={[styles.coinAbbr, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(3)}%</Text>
          </View>
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
    color: '#c6c6c6'
  },
  coinAbbr: {
    fontsize: 8,
    marginTop: 2,
    color: "#a9abb1",
  }
})

import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { ScrollView } from 'react-native-gesture-handler';


const Calculator = ({
  currentPrice,
  symbol,
  image,
  marketRank,
  coinName,
  marketCap,
  fullDilutedValuation,
  totalVolume,
  totalSupply
}) => {
  const [coinValue, setCoinValue] = useState(1);
  const [inrValue, setInrValue] = useState(currentPrice);


  const changeCoinValue = (value) => {
    setCoinValue(value)
    const calcValue = parseFloat(value.replace(",", ".")) || 0;
    setInrValue((calcValue * currentPrice).toString());
  }

  const changeInrValue = (value) => {
    setInrValue(value);
    const calcValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((calcValue / currentPrice).toString());
  }


  return (
    <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }} >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.coinImageContainer}>
            <Image source={{ uri: image }} style={styles.coinImage} />
            <MaskedView maskElement={<Text style={[styles.coinTitle, { backgroundColor: 'transparent' }]}>{coinName} ({symbol.toUpperCase()})</Text>
            }>
              <LinearGradient colors={['#5f2c82', '#49a09d']}>
                <Text style={[styles.coinTitle, { opacity: 0 }]}>{coinName} ({symbol.toUpperCase()})</Text>
              </LinearGradient>
            </MaskedView>
          </View>
          <View style={styles.coinDescWrapper}>
            <Text style={styles.coinDesc}>Current Market Ranking: {marketRank}</Text>
            <Text style={styles.coinDesc}>Current price: ₹ {currentPrice.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')}</Text>
            <Text style={styles.coinDesc}>Market Capitalization: ₹ {marketCap.toLocaleString("en-IN", { currency: "INR" })}</Text>
            <Text style={styles.coinDesc}>Full Diluted Valuation : ₹ {fullDilutedValuation}</Text>
            <Text style={styles.coinDesc}>Total Volume: ₹ {totalVolume}</Text>
            <Text style={styles.coinDesc}>Total Supply: ₹ {totalSupply}</Text>
          </View>
          <View style={styles.calculatorWrapper}>
            <View style={styles.coinCalculatorWrapper}>
              <MaskedView maskElement={<Text style={{ backgroundColor: 'transparent', fontWeight: '700' }}>{symbol.toUpperCase()}</Text>
              }>
                <LinearGradient colors={['#5f2c82', '#49a09d']}>
                  <Text style={{ opacity: 0, fontWeight: '700' }}>{symbol.toUpperCase()}</Text>
                </LinearGradient>
              </MaskedView>
              <TextInput
                value={coinValue.toString()}
                keyboardType={"numeric"}
                onChangeText={changeCoinValue}
                style={styles.coinInput} />
            </View>
            <View style={styles.coinCalculatorWrapper}>
              <MaskedView maskElement={<Text style={{ fontWeight: '700', backgroundColor: 'transparent' }}>INR</Text>
              }>
                <LinearGradient colors={['#5f2c82', '#49a09d']}>
                  <Text style={{ fontWeight: '700', opacity: 0 }}>INR</Text>
                </LinearGradient>
              </MaskedView>
              <TextInput
                value={inrValue.toString()}
                keyboardType={"numeric"}
                onChangeText={changeInrValue}
                style={styles.coinInput} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Calculator;


const styles = StyleSheet.create({
  coinImage: {
    width: 100,
    height: 100
  },
  coinImageContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  coinTitle: {
    color: '#c6c6c6',
    marginTop: 3,
    fontWeight: 'bold',
  },
  coinDescWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  coinDesc: {
    fontWeight: '200',
    color: '#c6c6c6'
  },
  coinCalculatorWrapper: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  calculatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  coinInput: {
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10,
    color:'#c6c6c6',
    borderColor: '#8395a7',
    borderWidth: 1,
    borderRadius: 50,
    flex: 1
  }
})



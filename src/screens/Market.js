import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SparkLine from '../../Components/Chart';
import ListItem from '../../Components/ListItem';
import { getMarketData } from '../../apiServices/Services';
import { FlatList } from 'react-native-gesture-handler';

const MarketScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);


  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  }


  return (
    <BottomSheetModalProvider>
      <View style={styles.container} >
        <View style={styles.marketTitleWrapper}>
          <Text style={styles.marketTitle}>
            Markets
          </Text>
        </View>
        <View style={styles.divider} />
        {/* <ScrollView showsHorizontalScrollIndicator={false}> */}
        <FlatList
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) =>
            <ListItem name={item.name}
              symbol={item.symbol}
              id={item.id}
              currentPrice={item.current_price}
              logoUrl={item.image}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              sparkline={item.sparkline_in_7d.price}
              onPress={() =>
                openModal(item)
              }
            />
          }
        />
        {/* </ScrollView> */}
      </View >
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData ? (
          <SparkLine
            currentPrice={selectedCoinData.current_price}
            symbol={selectedCoinData.symbol}
            name={selectedCoinData.name}
            logoUrl={selectedCoinData.image}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData.sparkline_in_7d.price}
            id={selectedCoinData.id}
          />
        ) : null}
      </BottomSheetModal>

    </BottomSheetModalProvider>
  );
}

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  marketTitle: {
    fontSize: 24,
    padding: 16,
    fontWeight: 'bold',
  },
  marketTitleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#a9abb1',
    marginHorizontal: 16,
    marginTop: 10
  },
  bottomSheet: {
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -8,
    // },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },

})

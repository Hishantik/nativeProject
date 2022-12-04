import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import SparkLine from './Chart';
import ListItem from './ListItem';
import { getMarketData } from '../apiServices/Services';
import { FlashList } from '@shopify/flash-list';

const MarketScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);


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
        <View style={styles.divider}></View>
        <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
          <FlashList
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
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
        </LinearGradient>
        {/* </ScrollView> */}
      </View >
      <LinearGradient colors={['#232526', '#414345']}>
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
      </LinearGradient>
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
  },
  bottomSheet: {
    shadowColor: "#fff",
    backgroundColor: 'transparent',
    // shadowOffset: {
    //   width: 0,
    //   height: -8,
    // },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

})

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import SparkLine from './Chart';
import ListItem from './ListItem';
import { getMarketData } from '../apiServices/Services';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from 'react-native-gesture-handler';

const MarketScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['40%'], []);

  // useEffect(() => {
  //   const fetchMarketData = async () => {
  //     const marketData = await getMarketData();
  //     setData(marketData);
  //   }

  //   fetchMarketData();
  // }, [])

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  }


  const fetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setData(coinsData);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setData(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container} >
        <View style={styles.divider}></View>
        <View style={styles.coinListHeader}>
          <Text style={styles.coinListTitle}>Coins</Text>
          <Text style={[styles.coinListTitle,{marginLeft:30}]}>Last 7 days</Text>
          <Text style={styles.coinListTitle}>Price</Text>
        </View>
        <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
          <FlashList
            keyExtractor={(item) => item.id}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl
              refreshing={loading}
              tintColor="#c6c6c6"
              onRefresh={refetchCoins}
            />
            }
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
          bottomInset={15}
          detached={true}
          backgroundStyle={styles.backGroundstyle}
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
  },
  bottomSheet: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  backGroundstyle: {
    backgroundColor: '#3d3d3d'
  },
  coinListHeader:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#3d3d3d'
  },
  coinListTitle:{
    color:'#c6c6c6',
    fontWeight:'900'
  }

})

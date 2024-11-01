import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [btcPrice, setBtcPrice] = useState({
    usd: null,
    eur: null,
    gbp: null,
    cad: null,
  });

  // Fetch BTC price from the API
  const fetchBTCPrice = async () => {
    try {
      const response = await fetch(
        'http://first.irandaneshkade.ir:8000/api/currency/'
      );
      const data = await response.json();
      setBtcPrice({
        usd: data.usd1,
        eur: data.eur1,
        gbp: data.gbp1,
        cad: data.cad1,
      });
    } catch (error) {
      console.error('Error fetching currencies price:', error);
    }
  };

  // Fetch price on component mount and set interval every 30 seconds
  useEffect(() => {
    fetchBTCPrice(); // Fetch initial price

    const interval = setInterval(() => {
      fetchBTCPrice(); // Fetch every 30 seconds
    }, 30000); // 30,000 ms = 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <ScrollView style={styles.body}>
      <View style={styles.headerDiv}>
        <Text style={styles.headerText}>chande ?!</Text>
      </View>

      <View style={styles.priceCardContainer}>
        {[
          { code: 'USD', name: 'US Dollar', flag: require('./assets/usaflag.png'), price: btcPrice.usd },
          { code: 'EUR', name: 'Euro', flag: require('./assets/eurflag.png'), price: btcPrice.eur },
          { code: 'GBP', name: 'British Pound', flag: require('./assets/gbpflag.png'), price: btcPrice.gbp },
          { code: 'CAD', name: 'Canadian Dollar', flag: require('./assets/cadflag.png'), price: btcPrice.cad },
        ].map((currency, index) => (
          <View key={index} style={styles.priceCard}>
            <View style={styles.currencyInfo}>
              <Image source={currency.flag} style={styles.flag} />
              <Text style={styles.currencyCode2}>{currency.name}</Text>
            </View>
            <View style={styles.currencyInfo}>
              <Text style={styles.currencyCode}>{currency.code}</Text>
            </View>
            <View style={styles.prices}>
              <Text style={styles.priceSmall}>Price</Text>
              <Text style={styles.priceLarge}>{currency.price ? currency.price : 'Loading...'}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#090909',
    margin: 0,
  },
  headerDiv: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 50,
    color: 'white',
    position: 'relative',
    top: '15%',
  },
  priceCardContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priceCard: {
    width: '48%', // Adjust width to fit two cards per row
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#1c1c1e',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 30,
  },
  currencyCode2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  currencyCode: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#f4f4f6',
  },
  prices: {
    marginTop: 10,
  },
  priceSmall: {
    fontSize: 20,
    color: 'gray',
  },
  priceLarge: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
});

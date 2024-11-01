import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const formatPrice = (price) => {
  if (!price) return 'Loading...';
  
  try {
    const number = parseFloat(price);
    if (isNaN(number)) {
      console.log('Invalid price:', price);
      return 'Invalid Price';
    }
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  } catch (error) {
    console.error('Error formatting price:', error);
    return 'Error Formatting';
  }
};

const CurrencyCard = ({ flag, name, symbol, value, change }) => (
  <View style={styles.card}>
    <Text style={styles.flag}>{flag}</Text>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.symbol}>{symbol}</Text>
    <Text style={styles.value}>{value}</Text>
    <Text style={[styles.change, change > 0 ? styles.positive : styles.negative]}>
      {change > 0 ? `↑${change}` : `↓${-change}`}
    </Text>
  </View>
);

const CurrencyApp = () => {
  const [prices, setPrices] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const fetchCurrPrice = async () => {
    try {
      const response = await fetch('http://first.irandaneshkade.ir:8000/api/currency/');
      const data = await response.json();
      setPrices({
        usd: data.usd1,
        eur: data.eur1,
        gbp: data.gbp1,
        chf: data.chf1,
        cad: data.cad1,
        aud: data.aud1,
        sek: data.sek1,
        nok: data.nok1,
        rub: data.rub1,
        thb: data.thb1,
        sgd: data.sgd1,
        hkd: data.hkd1,
        azn: data.azn1,
        amd: data.amd1,
        dkk: data.dkk1,
        aed: data.aed1,
        jpy: data.jpy1,
        try: data.try1,
        cny: data.cny1,
        sar: data.sar1,
        inr: data.inr1,
        myr: data.myr1,
        afn: data.afn1,
        kwd: data.kwd1,
        bhd: data.bhd1,
        omr: data.omr1,
        qar: data.qar1,

        emami: data.emami1,
        azadi: data.azadi1,
        nim: data.azadi1_2,
        rob: data.azadi1_4,
        gerami: data.azadi1g,
      });
    } catch (error) {
      console.error('Error fetching currencies price:', error);
    }
  };

  useEffect(() => {
    fetchCurrPrice();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <CurrencyCard flag="🇺🇸" name="US Dollar" symbol="USD" value={formatPrice(prices.usd)} change={50} />
            <CurrencyCard flag="🇪🇺" name="Euro" symbol="EUR" value={formatPrice(prices.eur)} change={5} />
            <CurrencyCard flag="🇬🇧" name="British Pound" symbol="GBP" value={formatPrice(prices.gbp)} change={185} />
            <CurrencyCard flag="🇨🇭" name="Swiss Franc" symbol="CHF" value={formatPrice(prices.chf)} change={10} />
            <CurrencyCard flag="🇨🇦" name="Canadian Dollar" symbol="CAD" value={formatPrice(prices.cad)} change={15} />
            <CurrencyCard flag="🇦🇺" name="Australian Dollar" symbol="AUD" value={formatPrice(prices.aud)} change={10} />
          </>
        );
      case 1:
        return (
          <>
            <CurrencyCard flag="🇺🇸" name="US Dollar" symbol="USD" value={formatPrice(prices.usd)} change={50} />
            <CurrencyCard flag="🇪🇺" name="Euro" symbol="EUR" value={formatPrice(prices.eur)} change={5} />
            <CurrencyCard flag="🇬🇧" name="British Pound" symbol="GBP" value={formatPrice(prices.gbp)} change={185} />
            <CurrencyCard flag="🇨🇭" name="Swiss Franc" symbol="CHF" value={formatPrice(prices.chf)} change={10} />
            <CurrencyCard flag="🇨🇦" name="Canadian Dollar" symbol="CAD" value={formatPrice(prices.cad)} change={15} />
            <CurrencyCard flag="🇦🇺" name="Australian Dollar" symbol="AUD" value={formatPrice(prices.aud)} change={10} />
            <CurrencyCard flag="🇸🇪" name="Swedish Krona" symbol="SEK" value={formatPrice(prices.sek)} change={5} />
            <CurrencyCard flag="🇳🇴" name="Norwegian Krone" symbol="NOK" value={formatPrice(prices.nok)} change={12} />
            <CurrencyCard flag="🇷🇺" name="Russian Ruble" symbol="RUB" value={formatPrice(prices.rub)} change={-2} />
            <CurrencyCard flag="🇹🇭" name="Thai Baht" symbol="THB" value={formatPrice(prices.thb)} change={3} />
            <CurrencyCard flag="🇸🇬" name="Singapore Dollar" symbol="SGD" value={formatPrice(prices.sgd)} change={4} />
            <CurrencyCard flag="🇭🇰" name="Hong Kong Dollar" symbol="HKD" value={formatPrice(prices.hkd)} change={2} />
            <CurrencyCard flag="🇦🇿" name="Azerbaijani Manat" symbol="AZN" value={formatPrice(prices.azn)} change={1} />
            <CurrencyCard flag="🇦🇲" name="Armenian Dram" symbol="AMD" value={formatPrice(prices.amd)} change={8} />
            <CurrencyCard flag="🇩🇰" name="Danish Krone" symbol="DKK" value={formatPrice(prices.dkk)} change={5} />
            <CurrencyCard flag="🇦🇪" name="UAE Dirham" symbol="AED" value={formatPrice(prices.aed)} change={7} />
            <CurrencyCard flag="🇯🇵" name="Japanese Yen" symbol="JPY" value={formatPrice(prices.jpy)} change={-20} />
            <CurrencyCard flag="🇹🇷" name="Turkish Lira" symbol="TRY" value={formatPrice(prices.try)} change={-10} />
            <CurrencyCard flag="🇨🇳" name="Chinese Yuan" symbol="CNY" value={formatPrice(prices.cny)} change={15} />
            <CurrencyCard flag="🇸🇦" name="Saudi Riyal" symbol="SAR" value={formatPrice(prices.sar)} change={4} />
            <CurrencyCard flag="🇮🇳" name="Indian Rupee" symbol="INR" value={formatPrice(prices.inr)} change={6} />
            <CurrencyCard flag="🇲🇾" name="Malaysian Ringgit" symbol="MYR" value={formatPrice(prices.myr)} change={2} />
            <CurrencyCard flag="🇦🇫" name="Afghan Afghani" symbol="AFN" value={formatPrice(prices.afn)} change={3} />
            <CurrencyCard flag="🇰🇼" name="Kuwaiti Dinar" symbol="KWD" value={formatPrice(prices.kwd)} change={1} />
            <CurrencyCard flag="🇧🇭" name="Bahraini Dinar" symbol="BHD" value={formatPrice(prices.bhd)} change={1} />
            <CurrencyCard flag="🇴🇲" name="Omani Rial" symbol="OMR" value={formatPrice(prices.omr)} change={1} />
            <CurrencyCard flag="🇶🇦" name="Qatari Riyal" symbol="QAR" value={formatPrice(prices.qar)} change={3} />
          </>
        );
      case 2:
        return (
          <>
            <CurrencyCard flag="emami" name="Emami" symbol="RUB" value={formatPrice(prices.emami)} change={-2} />
            <CurrencyCard flag="azadi" name="Azad" symbol="THB" value={formatPrice(prices.azadi)} change={3} />
            <CurrencyCard flag="nim" name="½ Azadi" symbol="SGD" value={formatPrice(prices.nim)} change={4} />
            <CurrencyCard flag="rob" name="¼ Azadi" symbol="HKD" value={formatPrice(prices.rob)} change={2} />
            <CurrencyCard flag="gerami" name="Gerami" symbol="HKD" value={formatPrice(prices.gerami)} change={2} />
          </>
        );
      case 3:
        return (
          <>
            
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chand?!</Text>
      <View style={styles.tabBar}>
        {['Favorite', 'Currency', 'Golds', 'Convertor'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#333',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  flag: {
    fontSize: 24,
  },
  name: {
    color: '#bbb',
    fontSize: 14,
    fontWeight: 'bold',
  },
  symbol: {
    color: '#777',
    fontSize: 12,
  },
  value: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  change: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4caf50',
  },
  negative: {
    color: '#f44336',
  },
});

export default CurrencyApp;

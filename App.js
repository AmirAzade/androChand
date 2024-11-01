import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';

export const flagImages = {
  us: require('./assets/flags/us.png'),
  eu: require('./assets/flags/eu.png'),
  gb: require('./assets/flags/gb.png'),
  ch: require('./assets/flags/ch.png'),
  ca: require('./assets/flags/ca.png'),
  au: require('./assets/flags/au.png'),
  se: require('./assets/flags/se.png'),
  no: require('./assets/flags/no.png'),
  ru: require('./assets/flags/ru.png'),
  th: require('./assets/flags/th.png'),
  sg: require('./assets/flags/sg.png'),
  hk: require('./assets/flags/hk.png'),
  az: require('./assets/flags/az.png'),
  am: require('./assets/flags/am.png'),
  dk: require('./assets/flags/dk.png'),
  ae: require('./assets/flags/ae.png'),
  jp: require('./assets/flags/jp.png'),
  tr: require('./assets/flags/tr.png'),
  cn: require('./assets/flags/cn.png'),
  sa: require('./assets/flags/sa.png'),
  in: require('./assets/flags/in.png'),
  my: require('./assets/flags/my.png'),
  af: require('./assets/flags/af.png'),
  kw: require('./assets/flags/kw.png'),
  bh: require('./assets/flags/bh.png'),
  om: require('./assets/flags/om.png'),
  qa: require('./assets/flags/qa.png'),

  azd: require('./assets/flags/azd.png'),
  emm: require('./assets/flags/emm.png'),
  nim: require('./assets/flags/nim.png'),
  rob: require('./assets/flags/rob.png'),
  grm: require('./assets/flags/grm.png'),

  gram: require('./assets/flags/gram.png'),
  mithqal: require('./assets/flags/mithqal.png'),
  ounce: require('./assets/flags/ounce.png'),

};

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
    <Image source={flagImages[flag]} style={styles.flag} />
    {/* <Text style={styles.flag}>{flag}</Text> */}
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
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('eur');
  const [conversionResult, setConversionResult] = useState(null);
  const [resultAmount, setResultAmount] = useState('');


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

        grm: data.gol18,
        mql: data.mithqal,
        oz: data.ounce,


      });
    } catch (error) {
      console.error('Error fetching currency prices:', error);
    }
  };

  useEffect(() => {
  
    fetchCurrPrice();
  }, []);

  const handleConvert = () => {
    if (!prices[fromCurrency] || !prices[toCurrency]) return;
    const fromRate = parseFloat(prices[fromCurrency]);
    const toRate = parseFloat(prices[toCurrency]);
    const result = (parseFloat(amount) * fromRate) / toRate;
    setResultAmount(result.toFixed(2));
  };

  const handleResultChange = (newResult) => {
    setResultAmount(newResult);
    if (prices[fromCurrency] && prices[toCurrency]) {
      const fromRate = parseFloat(prices[fromCurrency]);
      const toRate = parseFloat(prices[toCurrency]);
      const originalAmount = (parseFloat(newResult) * toRate) / fromRate;
      setAmount(originalAmount.toFixed(2));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <CurrencyCard flag="us" name="US Dollar" symbol="USD" value={formatPrice(prices.usd)} change={50} />
            <CurrencyCard flag="eu" name="Euro" symbol="EUR" value={formatPrice(prices.eur)} change={5} />
            <CurrencyCard flag="gb" name="British Pound" symbol="GBP" value={formatPrice(prices.gbp)} change={185} />
            <CurrencyCard flag="ch" name="Swiss Franc" symbol="CHF" value={formatPrice(prices.chf)} change={10} />
            <CurrencyCard flag="ca" name="Canadian Dollar" symbol="CAD" value={formatPrice(prices.cad)} change={15} />
            <CurrencyCard flag="au" name="Australian Dollar" symbol="AUD" value={formatPrice(prices.aud)} change={10} />
          </>
        );
      case 1:
        return (
          <>
            <CurrencyCard flag="us" name="US Dollar" symbol="USD" value={formatPrice(prices.usd)} change={50} />
            <CurrencyCard flag="eu" name="Euro" symbol="EUR" value={formatPrice(prices.eur)} change={5} />
            <CurrencyCard flag="gb" name="British Pound" symbol="GBP" value={formatPrice(prices.gbp)} change={185} />
            <CurrencyCard flag="ch" name="Swiss Franc" symbol="CHF" value={formatPrice(prices.chf)} change={10} />
            <CurrencyCard flag="ca" name="Canadian Dollar" symbol="CAD" value={formatPrice(prices.cad)} change={15} />
            <CurrencyCard flag="au" name="Australian Dollar" symbol="AUD" value={formatPrice(prices.aud)} change={10} />
            <CurrencyCard flag="se" name="Swedish Krona" symbol="SEK" value={formatPrice(prices.sek)} change={5} />
            <CurrencyCard flag="no" name="Norwegian Krone" symbol="NOK" value={formatPrice(prices.nok)} change={12} />
            <CurrencyCard flag="ru" name="Russian Ruble" symbol="RUB" value={formatPrice(prices.rub)} change={-2} />
            <CurrencyCard flag="th" name="Thai Baht" symbol="THB" value={formatPrice(prices.thb)} change={3} />
            <CurrencyCard flag="sg" name="Singapore Dollar" symbol="SGD" value={formatPrice(prices.sgd)} change={4} />
            <CurrencyCard flag="hk" name="Hong Kong Dollar" symbol="HKD" value={formatPrice(prices.hkd)} change={2} />
            <CurrencyCard flag="az" name="Azerbaijani Manat" symbol="AZN" value={formatPrice(prices.azn)} change={1} />
            <CurrencyCard flag="am" name="Armenian Dram" symbol="AMD" value={formatPrice(prices.amd)} change={8} />
            <CurrencyCard flag="dk" name="Danish Krone" symbol="DKK" value={formatPrice(prices.dkk)} change={5} />
            <CurrencyCard flag="ae" name="UAE Dirham" symbol="AED" value={formatPrice(prices.aed)} change={7} />
            <CurrencyCard flag="jp" name="Japanese Yen" symbol="JPY" value={formatPrice(prices.jpy)} change={-20} />
            <CurrencyCard flag="tr" name="Turkish Lira" symbol="TRY" value={formatPrice(prices.try)} change={-10} />
            <CurrencyCard flag="cn" name="Chinese Yuan" symbol="CNY" value={formatPrice(prices.cny)} change={15} />
            <CurrencyCard flag="sa" name="Saudi Riyal" symbol="SAR" value={formatPrice(prices.sar)} change={4} />
            <CurrencyCard flag="in" name="Indian Rupee" symbol="INR" value={formatPrice(prices.inr)} change={6} />
            <CurrencyCard flag="my" name="Malaysian Ringgit" symbol="MYR" value={formatPrice(prices.myr)} change={2} />
            <CurrencyCard flag="af" name="Afghan Afghani" symbol="AFN" value={formatPrice(prices.afn)} change={3} />
            <CurrencyCard flag="kw" name="Kuwaiti Dinar" symbol="KWD" value={formatPrice(prices.kwd)} change={1} />
            <CurrencyCard flag="bh" name="Bahraini Dinar" symbol="BHD" value={formatPrice(prices.bhd)} change={1} />
            <CurrencyCard flag="om" name="Omani Rial" symbol="OMR" value={formatPrice(prices.omr)} change={1} />
            <CurrencyCard flag="qa" name="Qatari Riyal" symbol="QAR" value={formatPrice(prices.qar)} change={3} />
          </>
        );
      case 2:
        return (
          <>
            <CurrencyCard flag="emm" name="Emami" symbol="EMM" value={formatPrice(prices.emami)} change={-2} />
            <CurrencyCard flag="azd" name="Azadi" symbol="AZD" value={formatPrice(prices.azadi)} change={3} />
            <CurrencyCard flag="nim" name="½ Azadi" symbol="NIM" value={formatPrice(prices.nim)} change={4} />
            <CurrencyCard flag="rob" name="¼ Azadi" symbol="ROB" value={formatPrice(prices.rob)} change={2} />
            <CurrencyCard flag="grm" name="Gerami" symbol="GRMI" value={formatPrice(prices.gerami)} change={2} />

            <CurrencyCard flag="gram" name="Gram" symbol="GRM" value={formatPrice(prices.grm)} change={2} />
            <CurrencyCard flag="ounce" name="Ounce" symbol="OZ" value={formatPrice(prices.oz) + " $"} change={2} />
            <CurrencyCard flag="mithqal" name="Mithqal" symbol="MQL" value={formatPrice(prices.mql)} change={2} />

          </>
        );

      case 3:
        return (
          <View style={styles.convertorContainer}>
            <Text style={styles.label}>Amount:</Text>
            <View style={styles.row}>
              <Picker
                selectedValue={fromCurrency}
                onValueChange={(itemValue) => setFromCurrency(itemValue)}
                style={styles.picker}
              >
                {Object.keys(prices).map((key) => (
                  <Picker.Item key={key} label={key.toUpperCase()} value={key} />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter amount"
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
            </View>
            
            <Text style={styles.label}>Converted Amount:</Text>
            <View style={styles.row}>
              <Picker
                selectedValue={toCurrency}
                onValueChange={(itemValue) => setToCurrency(itemValue)}
                style={styles.picker}
              >
                {Object.keys(prices).map((key) => (
                  <Picker.Item key={key} label={key.toUpperCase()} value={key} />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={resultAmount}
                onChangeText={handleResultChange}
              />
            </View>
            <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chand?!</Text>
      <View style={styles.tabBar}>
        {['Favorites', 'Currency', 'Golds', 'Convertor'].map((tab, index) => (
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
    borderRadius: 15,
    marginBottom: 20,
  },
  flag: {
    width:30,
    height:30,
    borderRadius: 100,
    marginBottom: 10,
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
  
  label: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  
  convertButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  convertorContainer: {
    padding: 20,
    width:"100%",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    flex: 17,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 5,
    height: 40,
  },
  input: {
    flex: 23,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    height: 55,
  },
   

});

export default CurrencyApp;

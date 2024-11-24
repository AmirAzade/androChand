import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
// import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Ionicons } from '@expo/vector-icons'; 

import { I18nManager } from 'react-native';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export const currencyData = {
  usd: { flag: require('./assets/flags/us.png'), name: "US Dollar" },
  eur: { flag: require('./assets/flags/eu.png'), name: "Euro" },
  gbp: { flag: require('./assets/flags/gb.png'), name: "British Pound" },
  chf: { flag: require('./assets/flags/ch.png'), name: "Swiss Franc" },
  cad: { flag: require('./assets/flags/ca.png'), name: "Canadian Dollar" },
  aud: { flag: require('./assets/flags/au.png'), name: "Australian Dollar" },
  sek: { flag: require('./assets/flags/se.png'), name: "Swedish Krona" },
  nok: { flag: require('./assets/flags/no.png'), name: "Norwegian Krone" },
  rub: { flag: require('./assets/flags/ru.png'), name: "Russian Ruble" },
  thb: { flag: require('./assets/flags/th.png'), name: "Thai Baht" },
  sgd: { flag: require('./assets/flags/sg.png'), name: "Singapore Dollar" },
  hkd: { flag: require('./assets/flags/hk.png'), name: "Hong Kong Dollar" },
  azn: { flag: require('./assets/flags/az.png'), name: "Azerbaijani Manat" },
  amd: { flag: require('./assets/flags/am.png'), name: "Armenian Dram" },
  dkk: { flag: require('./assets/flags/dk.png'), name: "Danish Krone" },
  aed: { flag: require('./assets/flags/ae.png'), name: "UAE Dirham" },
  jpy: { flag: require('./assets/flags/jp.png'), name: "Japanese Yen" },
  try: { flag: require('./assets/flags/tr.png'), name: "Turkish Lira" },
  cny: { flag: require('./assets/flags/cn.png'), name: "Chinese Yuan" },
  sar: { flag: require('./assets/flags/sa.png'), name: "Saudi Riyal" },
  inr: { flag: require('./assets/flags/in.png'), name: "Indian Rupee" },
  myr: { flag: require('./assets/flags/my.png'), name: "Malaysian Ringgit" },
  afn: { flag: require('./assets/flags/af.png'), name: "Afghan Afghani" },
  kwd: { flag: require('./assets/flags/kw.png'), name: "Kuwaiti Dinar" },
  bhd: { flag: require('./assets/flags/bh.png'), name: "Bahraini Dinar" },
  omr: { flag: require('./assets/flags/om.png'), name: "Omani Rial" },
  qar: { flag: require('./assets/flags/qa.png'), name: "Qatari Riyal" },
  
  emm: { flag: require('./assets/flags/emm.png'), name: "Emami" },
  azd: { flag: require('./assets/flags/azd.png'), name: "Azadi" },
  nim: { flag: require('./assets/flags/nim.png'), name: "½ Azadi" },
  rob: { flag: require('./assets/flags/rob.png'), name: "¼ Azadi" },
  grmi: { flag: require('./assets/flags/grm.png'), name: "Gerami" },
  
  grm: { flag: require('./assets/flags/gram.png'), name: "Gold Gram" },
  mql: { flag: require('./assets/flags/mithqal.png'), name: "Mithqal" },
  oz: { flag: require('./assets/flags/ounce.png'), name: "Ounce" },
};


export const flagImages = {
  usd: require('./assets/flags/us.png'),
  eur: require('./assets/flags/eu.png'),
  gbp: require('./assets/flags/gb.png'),
  chf: require('./assets/flags/ch.png'),
  cad: require('./assets/flags/ca.png'),
  aud: require('./assets/flags/au.png'),
  sek: require('./assets/flags/se.png'),
  nok: require('./assets/flags/no.png'),
  rub: require('./assets/flags/ru.png'),
  thb: require('./assets/flags/th.png'),
  sgd: require('./assets/flags/sg.png'),
  hkd: require('./assets/flags/hk.png'),
  azn: require('./assets/flags/az.png'),
  amd: require('./assets/flags/am.png'),
  dkk: require('./assets/flags/dk.png'),
  aed: require('./assets/flags/ae.png'),
  jpy: require('./assets/flags/jp.png'),
  try: require('./assets/flags/tr.png'),
  cny: require('./assets/flags/cn.png'),
  sar: require('./assets/flags/sa.png'),
  inr: require('./assets/flags/in.png'),
  myr: require('./assets/flags/my.png'),
  afn: require('./assets/flags/af.png'),
  kwd: require('./assets/flags/kw.png'),
  bhd: require('./assets/flags/bh.png'),
  omr: require('./assets/flags/om.png'),
  qaq: require('./assets/flags/qa.png'),

  azd: require('./assets/flags/azd.png'),
  emm: require('./assets/flags/emm.png'),
  nim: require('./assets/flags/nim.png'),
  rob: require('./assets/flags/rob.png'),
  grmi: require('./assets/flags/grm.png'),

  grm: require('./assets/flags/gram.png'),
  mql: require('./assets/flags/mithqal.png'),
  oz: require('./assets/flags/ounce.png'),

};

const formatPrice = (price) => {
  if (!price) return 'Loading...';
  
  try {
    const number = parseFloat(price);
    if (isNaN(number)) {
      console.log('Invalid price:', price);
      return 'Invalid Price';
    }
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } catch (error) {
    console.error('Error formatting price:', error);
    return 'Error Formatting';
  }
};



const CurrencyApp = () => {
  
  const [favorites, setFavorites] = useState(['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD']);
  const [currency_prices, currency_setPrices] = useState({});
  const [gold_prices, gold_setPrices] = useState({});
  const [convert_prices, convert_setPrices] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('irr');
  const [conversionResult, setConversionResult] = useState(null);
  const [resultAmount, setResultAmount] = useState('');

  const toggleFavorite = (symbol) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(symbol)
        ? prevFavorites.filter((fav) => fav !== symbol) // Remove if already favorite
        : [...prevFavorites, symbol] // Add if not already favorite
    );
  };

  // const [fontsLoaded] = useFonts({
  //   'kir': require('./assets/fonts/SF-Pro.ttf'),
  // });

  const fetchCurrPrice = async () => {
    try {
      const response = await fetch('https://api.amirazade.ir/api/currency/');
      const data = await response.json();
      currency_setPrices({
        usd: data.usd1,
        usd_change: data.usd3,
        eur: data.eur1,
        eur_change: data.eur3,
        gbp: data.gbp1,
        gbp_change: data.gbp3,
        chf: data.chf1,
        chf_change: data.chf3,
        cad: data.cad1,
        cad_change: data.cad3,
        aud: data.aud1,
        aud_change: data.aud3,
        sek: data.sek1,
        sek_change: data.sek3,
        nok: data.nok1,
        nok_change: data.nok3,
        rub: data.rub1,
        rub_change: data.rub3,
        thb: data.thb1,
        thb_change: data.thb3,
        sgd: data.sgd1,
        sgd_change: data.sgd3,
        hkd: data.hkd1,
        hkd_change: data.hkd3,
        azn: data.azn1,
        azn_change: data.azn3,
        amd: data.amd1,
        amd_change: data.amd3,
        dkk: data.dkk1,
        dkk_change: data.dkk3,
        aed: data.aed1,
        aed_change: data.aed3,
        jpy: data.jpy1,
        jpy_change: data.jpy3,
        try: data.try1,
        try_change: data.try3,
        cny: data.cny1,
        cny_change: data.cny3,
        sar: data.sar1,
        sar_change: data.sar3,
        inr: data.inr1,
        inr_change: data.inr3,
        myr: data.myr1,
        myr_change: data.myr3,
        afn: data.afn1,
        afn_change: data.afn3,
        kwd: data.kwd1,
        kwd_change: data.kwd3,
        bhd: data.bhd1,
        bhd_change: data.bhd3,
        omr: data.omr1,
        omr_change: data.omr3,
        qar: data.qar1,
        qar_change: data.qar3,
      });

      gold_setPrices({
        emm: data.emami1,
        emm_change: data.emami13,
        azd: data.azadi1,
        azd_change: data.azadi13,
        nim: data.azadi1_2,
        nim_change: data.azadi1_23,
        rob: data.azadi1_4,
        rob_change: data.azadi1_43,
        grmi: data.azadi1g,
        grmi_change: data.azadi1g3,

        grm: data.gol18,
        mql: data.mithqal,
        oz: data.ounce
      });

      convert_setPrices({
        irr : 1,
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


        emm: data.emami1,
        azd: data.azadi1,
        nim: data.azadi1_2,
        rob: data.azadi1_4,
        grmi: data.azadi1g,

        grm: data.gol18,
        mql: data.mithqal,
        oz: data.ounce
      });

    } catch (error) {
      console.error('Error fetching currency prices:', error);
    }
  };

  useEffect(() => {
    fetchCurrPrice();
    const intervalId = setInterval(fetchCurrPrice, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Automatically trigger conversion when either currency picker changes
    if (amount) {
      handleConvert(amount);
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = (newResult1) => {
    newResult1 = newResult1.replace(/,/g, "");

    if(isNaN(newResult1) || !newResult1) {
      newResult1 = "";
      setAmount((newResult1));
      setResultAmount("")
    }
    else{
      setAmount(formatPrice(newResult1));
    }

    if (convert_prices[fromCurrency] && convert_prices[toCurrency] && !isNaN(newResult1) && newResult1)
    {
      const fromRate = parseFloat(convert_prices[fromCurrency]);
      const toRate = parseFloat(convert_prices[toCurrency]);
      const result = (parseFloat(newResult1) * fromRate) / toRate;

      setResultAmount(formatPrice(result.toFixed(2)));
    }
  };

  const handleResultChange = (newResult2) => {
    newResult2 = newResult2.replace(/,/g, "");
    if(isNaN(newResult2) || !newResult2) {
      newResult2 = "";
      setResultAmount((newResult2));
      setAmount("");
    }
    else{
      setResultAmount(formatPrice(newResult2));
    }

    
    if (convert_prices[fromCurrency] && convert_prices[toCurrency] && !isNaN(newResult2) && newResult2)
    {
      const fromRate = parseFloat(convert_prices[fromCurrency]);
      const toRate = parseFloat(convert_prices[toCurrency]);
      const originalAmount = (parseFloat(newResult2) * toRate) / fromRate;
      setAmount(formatPrice(originalAmount.toFixed(2)));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            {favorites.length === 0 ? (
              <Text style={styles.noFavorites}>No favorites selected.</Text>
            ) : (
              favorites.map((symbol) => (
                <CurrencyCard
                  key={symbol}
                  symbol={symbol}
                  prices= {symbol.toLowerCase()  in currency_prices? currency_prices : gold_prices}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                />
                
              ))
            )}
          </>
        );
      case 1:
        return (
          <>
          {Object.keys(currency_prices)
              .filter((key) => !key.includes('_change')) // Exclude "_change" keys
              .map((symbol) => (
                <CurrencyCard
                  key={symbol}
                  symbol={symbol.toUpperCase()}
                  prices={currency_prices}
                  isFavorite={favorites.includes(symbol.toUpperCase())}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            {/* <CurrencyCard symbol="USD" prices={prices} />
            <CurrencyCard symbol="EUR" prices={prices} />
            <CurrencyCard symbol="GBP" prices={prices} />
            <CurrencyCard symbol="CHF" prices={prices} />
            <CurrencyCard symbol="CAD" prices={prices} />
            <CurrencyCard symbol="AUD" prices={prices} />
            <CurrencyCard symbol="SEK" prices={prices} />
            <CurrencyCard symbol="NOK" prices={prices} />
            <CurrencyCard symbol="RUB" prices={prices} />
            <CurrencyCard symbol="THB" prices={prices} />
            <CurrencyCard symbol="SGD" prices={prices} />
            <CurrencyCard symbol="HKD" prices={prices} />
            <CurrencyCard symbol="AZN" prices={prices} />
            <CurrencyCard symbol="AMD" prices={prices} />
            <CurrencyCard symbol="DKK" prices={prices} />
            <CurrencyCard symbol="AED" prices={prices} />
            <CurrencyCard symbol="JPY" prices={prices} />
            <CurrencyCard symbol="TRY" prices={prices} />
            <CurrencyCard symbol="CNY" prices={prices} />
            <CurrencyCard symbol="SAR" prices={prices} />
            <CurrencyCard symbol="INR" prices={prices} />
            <CurrencyCard symbol="MYR" prices={prices} />
            <CurrencyCard symbol="AFN" prices={prices} />
            <CurrencyCard symbol="KWD" prices={prices} />
            <CurrencyCard symbol="BHD" prices={prices} />
            <CurrencyCard symbol="OMR" prices={prices} />
            <CurrencyCard symbol="QAR" prices={prices} /> */}
          </>
        );
      case 2:
        return (
          <>
          {Object.keys(gold_prices)
            .filter((key) => !key.includes('_change')) // Exclude "_change" keys
            .map((symbol) => (
              <CurrencyCard
                key={symbol}
                symbol={symbol.toUpperCase()}
                prices={gold_prices}
                isFavorite={favorites.includes(symbol.toUpperCase())}
                onToggleFavorite={toggleFavorite}
              />
            ))}
            {/* <CurrencyCard symbol="EMM" prices={prices}/>
            <CurrencyCard symbol="AZD" prices={prices}/>
            <CurrencyCard symbol="NIM" prices={prices}/>
            <CurrencyCard symbol="ROB" prices={prices}/>
            <CurrencyCard symbol="GRMI" prices={prices}/>
            
            <CurrencyCard symbol="GRM" prices={prices}/>
            <CurrencyCard symbol="OZ" prices={prices}/>
            <CurrencyCard symbol="MQL" prices={prices}/> */}
          </>
        );


      case 3:
        return (
          <View style={styles.convertorContainer}>
            <Text style={styles.label}>Amount:</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={fromCurrency}
                    onValueChange={(itemValue) => {
                      setFromCurrency(itemValue);
                      handleConvert(amount); // Update TextInput based on currency change
                    }}
                    style={{ color: "#dedede" }}
                  >
                    {Object.keys(convert_prices).map((key) => (
                      <Picker.Item key={key} label={key.toUpperCase()} value={key} />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  placeholderTextColor= "#c9c9c9"
                  value={amount}
                  onChangeText={handleConvert}
                />
              </View>
            </View>

            <View style={styles.iconContainer}>
              <Ionicons name="swap-vertical" size={32} color="white" />
            </View>

            <Text style={styles.label}>Converted Amount:</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={toCurrency}
                    onValueChange={(itemValue) => {
                      setToCurrency(itemValue);
                      handleConvert(amount); // Update TextInput based on currency change
                    }}
                    style={{ color: "#dedede" }}
                  >
                    {Object.keys(convert_prices).map((key) => (
                      <Picker.Item key={key} label={key.toUpperCase()} value={key} />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Converted Amount"
                  placeholderTextColor= "#c9c9c9"
                  value={resultAmount}
                  onChangeText={handleResultChange}
                />
              </View>
            </View>
          </View>

        );
      default:
        return null;
    }
  };

  

  return (
    // <View style={[styles.container,{ fontFamily: 'CustomFont', fontSize: 24 }]}>
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='transparent'></StatusBar>
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

const CurrencyCard = ({ symbol, prices, isFavorite, onToggleFavorite }) => {
  const value = prices[symbol.toLowerCase()];
  const change = prices[`${symbol.toLowerCase()}_change`];

  return (
    <View style={styles.card}>
      <View style={styles.flagContainer}>
        <Image source={currencyData[symbol.toLowerCase()].flag} style={styles.flag} />
        <View style={styles.nameSymbolContainer}>
          <Text style={styles.name}>{currencyData[symbol.toLowerCase()].name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>

        <TouchableOpacity onPress={() => onToggleFavorite(symbol)} style={styles.favoriteIcon}>
          <Icon
            name={isFavorite ? 'radio-button-unchecked' : 'radio-button-unchecked'}
            size={45}
            color={isFavorite ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      </View>
      <Text style={[ styles.break_line ]} > {"\n"} </Text>

      {!isNaN(change) ? (
        <Text
          style={[
            styles.change,
            change == 0 ? styles.noChange : change > 0 ? styles.positive : styles.negative
          ]}
        >
          {change == 0
            ? ' 0% (0)'
            : change > 0
            ? `↑${((change / (value - change)) * 100).toFixed(2)}% (${formatPrice(change)})`
            : `↓${((-change / (value - change)) * 100).toFixed(2)}% (${formatPrice(-change)})`}
        </Text>
      ) : (
        <Text
          style={[
            styles.change,
            styles.noChange
          ]}
        >
          ---
        </Text>
    )}
      {formatPrice(value) === "Loading..." ? ( <Text style={styles.loading_value}>{formatPrice(value)}</Text> ) : (<Text style={[styles.value, { fontSize: formatPrice(value).length > 8 ? 22 : 25 }]}>{formatPrice(value) + (symbol.toLowerCase() === 'oz'? ' $' : '')}</Text>
    )}

    </View>
  );
};
 
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
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
    marginBottom: 2,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 8,
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
    marginTop: 20,
  },
  card: {
    backgroundColor: '#212124',
    width: '48%',
    height: screenWidth * 0.43,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  // card2: {
  //   backgroundColor: '#1c1c1e',
  //   width: '48%',
  //   padding: 15,
  //   borderRadius: 15,
  //   marginBottom: 20,
  // },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  nameSymbolContainer: {
    justifyContent: 'center',
    width: "80%"
  },
  name: {
    color: '#bbb',
    fontSize: 11,
    fontWeight: 'bold',
  },
  symbol: {
    color: '#777',
    fontSize: 12,
  },
  value: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  loading_value: {
    color: '#bfbfbf',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  change: {
    fontSize: 13,
    fontWeight: 'bold',
    width : '99%'
  },
  break_line: {
    fontSize: 7,
  },
  positive: {
    color: '#4caf50',
  },
  negative: {
    color: '#f44336',
  },
  noChange: {
    color: '#bfbfbf',
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
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#0000",
    borderWidth: 1,
    borderColor: "#828282",
  },
  picker: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#393b3a",
    color: '#dedede',
    borderRadius: 5,


  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0, // Input border is managed by inputGroup
    color: "#fff",
  },
  favoriteIcon: {
    position: 'absolute',
    // top: 0,
    left: -7.6,
  },

  iconContainer: {
    alignItems: "center", // Horizontally center the icon
    marginVertical: 8,   // Add space between input groups
  },

});

export default CurrencyApp;

// https://expo.dev/accounts/amirmoaz26/projects/androChand/builds/ccba929b-2923-4b84-8eca-a5bd0852228f
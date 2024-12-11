import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, ActivityIndicator, Appearance } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons'; 
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

import SystemNavigationBar from 'react-native-system-navigation-bar';
// import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

import { formatPrice } from './src/utils/formatPrice';
import { currencyData } from './src/constants/currencyData';
import { fetchCurrPrice } from './src/components/api';
import styles from './src/utils/style';

SystemNavigationBar.setBarMode('dark');
SystemNavigationBar.setNavigationColor('black');

const CurrencyApp = () => {

  const [favorites, setFavorites] = useState(['USD', 'EUR', 'GBP', 'AZD', 'NIM', 'GRM']);
  const [shirini, setShirini] = useState(null);
  const [currency_prices, currency_setPrices] = useState({});
  const [gold_prices, gold_setPrices] = useState({});
  const [convert_prices, convert_setPrices] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('irr');
  const [resultAmount, setResultAmount] = useState('');

  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';


  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };
  
  const saveFavorites = async (favorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites', error);
    }
  };

  const toggleFavorite = (symbol) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(symbol)
        ? prevFavorites.filter((fav) => fav !== symbol)
        : [...prevFavorites, symbol];
      
      saveFavorites(updatedFavorites);
      
      return updatedFavorites;
    });
  };

  useEffect(() => {

    loadFavorites();
    fetchCurrPrice(currency_setPrices, gold_setPrices, convert_setPrices, setShirini);

    const intervalId = setInterval(() => {
      fetchCurrPrice(currency_setPrices, gold_setPrices, convert_setPrices, setShirini);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
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

      setResultAmount(formatPrice(result.toFixed(2), 2));
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
      setAmount(formatPrice(originalAmount.toFixed(2), 2));
    }
  };
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
    
            {favorites.length === 0 ? (
              <View style={styles.noFavoritesContainer}>
                <Text style={styles.noFavorites}>No items in your favorites list{"\n"}Tap the flags to add to favorites</Text>
              </View>
            ) : (
              favorites.map((symbol, index) => (
                <React.Fragment key={`favorite-${symbol}`}>
                  <CurrencyCard
                    symbol={symbol}
                    prices={symbol.toLowerCase() in currency_prices ? currency_prices : gold_prices}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                  {(index + 1) % 6 === 0 && shirini === true && (
                    <ShiriniCard key={`shiriniCard-${index}`} />
                  )}
                </React.Fragment>
              ))              
            )}

          </>
        );
      case 1:
        return (
          <>
          {Object.keys(currency_prices)
          .filter((key) => !key.includes('_change'))
          .map((symbol, index) => (
            <React.Fragment key={`currency-${symbol}`}>
              <CurrencyCard
                symbol={symbol.toUpperCase()}
                prices={currency_prices}
                isFavorite={favorites.includes(symbol.toUpperCase())}
                onToggleFavorite={toggleFavorite}
              />
              {(index + 1) % 6 === 0 && shirini === true && (
                <ShiriniCard key={`shiriniCard-${index}`} />
              )}
            </React.Fragment>
          ))}

          </>
        );
      case 2:
        return (
          <>
          {Object.keys(gold_prices)
          .filter((key) => !key.includes('_change'))
          .map((symbol, index) => (
            <React.Fragment key={`gold-${symbol}`}>
              <CurrencyCard
                symbol={symbol.toUpperCase()}
                prices={gold_prices}
                isFavorite={favorites.includes(symbol.toUpperCase())}
                onToggleFavorite={toggleFavorite}
              />
              {(index + 1) % 6 === 0 && shirini === true && (
                <ShiriniCard key={`shiriniCard-${index}`} />
              )}
            </React.Fragment>
          ))}

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
              <TouchableOpacity onPress={handleSwap}>
                <Ionicons name="swap-vertical" size={32} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Converted Amount:</Text>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={toCurrency}
                    onValueChange={(itemValue) => {
                      setToCurrency(itemValue);
                      handleConvert(amount);
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
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent={true}
      />
      
      <Text style={styles.title}>Chande?!</Text>
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

const ShiriniCard = () => {
  const injectedScript = `
  (function(e,t,n){
    e.yektanetAnalyticsObject=n;
    e[n]=e[n]||function(){e[n].q.push(arguments)};
    e[n].q=e[n].q||[];
    var a=t.getElementsByTagName("head")[0],
    r=new Date,
    c="https://cdn.yektanet.com/superscript/n9Ke4qYo/native-no-data-40111/yn_pub.js?v="+r.getFullYear().toString()+"0"+r.getMonth()+"0"+r.getDate()+"0"+r.getHours(),
    s=t.createElement("link");
    s.rel="preload";
    s.as="script";
    s.href=c;
    a.appendChild(s);
    var l=t.createElement("script");
    l.async=!0;
    l.src=c;
    a.appendChild(l);

    // Add viewport meta tag to scale the ad content and disable zoom
    var meta = t.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=0.8, user-scalable=no";  // Set initial scale and disable zooming
    a.appendChild(meta);

    // Add CSS styles to scale the ad
    var style = t.createElement("style");
    style.innerHTML = \`
      #pos-article-text-card-102134 {
        transform: scale(1);  /* Adjust scale factor */
        transform-origin: top left; /* Set scaling origin */
      }
    \`;
    a.appendChild(style);
  })(window,document,"yektanet");
`;



  const handleOnMessage = (event) => {
    console.log("Message from WebView:", event.nativeEvent.data);
  };

  return (
    <View style={styles.shiriniCard}>
      <WebView
        originWhitelist={['*']} // Allow all URLs (be careful in production)
        source={{ html: '<div id="pos-article-text-card-102134"></div>' }} // Insert your ad HTML here
        javaScriptEnabled={true} // Enable JavaScript for the ad
        domStorageEnabled={true} // Enable DOM storage
        injectedJavaScript={injectedScript} // Inject the ad script
        onMessage={handleOnMessage} // Listen for messages from the WebView
        onError={(error) => console.error("WebView error:", error)} // Log any WebView errors
      />
      {/* Example Text that would need to be wrapped properly */}
    </View>
  );
};

export default CurrencyApp;
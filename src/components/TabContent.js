import React from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CurrencyCard from './CurrencyCard'; // Adjust the path as needed

const TabContent = ({
  activeTab,
  favorites,
  currency_prices,
  gold_prices,
  convert_prices,
  toggleFavorite,
  fromCurrency,
  toCurrency,
  amount,
  resultAmount,
  setFromCurrency,
  setToCurrency,
  handleConvert,
  handleResultChange,
  styles,
}) => {
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
                prices={
                  symbol.toLowerCase() in currency_prices
                    ? currency_prices
                    : gold_prices
                }
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
                    handleConvert(amount);
                  }}
                  style={{ color: '#dedede' }}
                >
                  {Object.keys(convert_prices).map((key) => (
                    <Picker.Item
                      key={key}
                      label={key.toUpperCase()}
                      value={key}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="#c9c9c9"
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
                    handleConvert(amount);
                  }}
                  style={{ color: '#dedede' }}
                >
                  {Object.keys(convert_prices).map((key) => (
                    <Picker.Item
                      key={key}
                      label={key.toUpperCase()}
                      value={key}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Converted Amount"
                placeholderTextColor="#c9c9c9"
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

export default TabContent;

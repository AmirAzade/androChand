import React from 'react';
import { View, Text, TextInput, Picker, StyleSheet } from 'react-native';

const Converter = ({
  amount,
  resultAmount,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  handleConvert,
  handleResultChange,
  convertPrices,
}) => {
  return (
    <View style={styles.container}>
      <Text>Amount:</Text>
      <Picker selectedValue={fromCurrency} onValueChange={(value) => setFromCurrency(value)}>
        {Object.keys(convertPrices).map((key) => (
          <Picker.Item key={key} label={key.toUpperCase()} value={key} />
        ))}
      </Picker>
      <TextInput value={amount} onChangeText={handleConvert} />
      <Text>Converted Amount:</Text>
      <Picker selectedValue={toCurrency} onValueChange={(value) => setToCurrency(value)}>
        {Object.keys(convertPrices).map((key) => (
          <Picker.Item key={key} label={key.toUpperCase()} value={key} />
        ))}
      </Picker>
      <TextInput value={resultAmount} onChangeText={handleResultChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default Converter;

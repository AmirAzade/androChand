import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CurrencyCard = ({ symbol, prices, isFavorite, onToggleFavorite }) => {
  const price = prices[symbol.toLowerCase()];
  const change = prices[`${symbol.toLowerCase()}_change`];

  return (
    <View style={styles.card}>
      <Image source={require(`../../assets/flags/${symbol.toLowerCase()}.png`)} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.name}>{symbol}</Text>
        <Text style={styles.price}>{price || 'Loading...'}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(symbol)}>
        <Icon name={isFavorite ? 'star' : 'star-border'} size={24} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  flag: { width: 32, height: 32, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, color: '#fff' },
  price: { fontSize: 14, color: '#aaa' },
});

export default CurrencyCard;

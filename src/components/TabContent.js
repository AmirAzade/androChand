import React from 'react';
import { Text } from 'react-native';
import CurrencyCard from './CurrencyCard';

const TabContent = ({ activeTab, favorites, currencyPrices, goldPrices, toggleFavorite }) => {
  if (activeTab === 0) {
    return favorites.length === 0 ? (
      <Text>No favorites selected.</Text>
    ) : (
      favorites.map((symbol) => (
        <CurrencyCard
          key={symbol}
          symbol={symbol}
          prices={currencyPrices}
          isFavorite
          onToggleFavorite={toggleFavorite}
        />
      ))
    );
  }

  const prices = activeTab === 1 ? currencyPrices : goldPrices;
  return Object.keys(prices).map((symbol) => (
    <CurrencyCard
      key={symbol}
      symbol={symbol.toUpperCase()}
      prices={prices}
      isFavorite={favorites.includes(symbol.toUpperCase())}
      onToggleFavorite={toggleFavorite}
    />
  ));
};

export default TabContent;

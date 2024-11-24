export const formatPrice = (price) => {
    if (!price) return 'Loading...';
    
    try {
      const number = parseFloat(price);
      if (isNaN(number)) return 'Invalid Price';
      return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    } catch (error) {
      console.error('Error formatting price:', error);
      return 'Error Formatting';
    }
  };
  
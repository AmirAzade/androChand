export const formatPrice = (price, digit = 0) => {
  if (!price) {
    return 'Loading...';
  }
  
  try {
    const number = parseFloat(price);
    if (isNaN(number)) {
      console.log('Invalid price:', price);
      return 'Invalid Price';
    }
    // Format the number using the 'en-US' locale
    return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: digit });
  } catch (error) {
    console.error('Error formatting price:', error);
    return 'Error Formatting';
  }
};

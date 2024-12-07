export const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0.00';
  return `₹${Number(price).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}; 
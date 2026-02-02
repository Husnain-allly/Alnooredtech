export const convertFromPKR = (pricePKR, currency, rates) => {
  if (currency === "PKR") return pricePKR;
  return pricePKR * (rates[currency] || 1);
};

export const formatMoney = (amount, currency, symbol) => {
  return new Intl.NumberFormat(currency === "PKR" ? "ur-PK" : "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  }).format(amount);
};

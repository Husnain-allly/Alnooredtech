// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [currency, setCurrency] = useState("PKR");
  const [exchangeRate, setExchangeRate] = useState(1); // Default for PKR

  // 🔹 Define static rates for simplicity (you can fetch dynamically later)
  const RATES = {
    PKR: 1,
    USD: 280,
    EUR: 300,
    GBP: 350,
    AUD: 185,
    SAR: 75,
  };

  // 🔹 Convert price based on selected currency
  const convertPrice = (price) => {
    if (currency === "PKR") return price;
    const rate = RATES[currency] || 1;
    return (price / rate);
  };

  // 🔹 Automatically detect country & set currency
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country_code;
        switch (country) {
          case "PK": setCurrency("PKR"); break;
          case "US": setCurrency("USD"); break;
          case "GB": setCurrency("GBP"); break;
          case "AU": setCurrency("AUD"); break;
          case "SA": setCurrency("SAR"); break;
          case "DE":
          case "FR":
          case "IT":
          case "ES":
          case "NL":
            setCurrency("EUR");
            break;
          default:
            setCurrency("USD");
        }
      })
      .catch(() => setCurrency("USD"));
  }, []);

  // 🔹 Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // 🔹 Calculate total in the selected currency
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + convertPrice(item.price) * item.quantity,
    0
  );

  // 🔹 Get proper currency symbol
  const currencySymbol = {
    PKR: "₨",
    USD: "$",
    EUR: "€",
    GBP: "£",
    AUD: "A$",
    SAR: "﷼",
  }[currency] || "$";

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        currency,
        setCurrency,
        totalPrice,
        currencySymbol,
        convertPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

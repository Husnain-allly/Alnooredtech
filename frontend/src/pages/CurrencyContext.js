// src/context/CurrencyContext.js
import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

const SYMBOLS = {
  PKR: "₨",
  USD: "$",
  EUR: "€",
  GBP: "£",
  AUD: "A$",
  SAR: "﷼",
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("PKR");
  const [rates, setRates] = useState({ PKR: 1 });

  // 🌍 Detect user country → currency
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then(res => res.json())
      .then(data => {
        const c = data.country_code;
        if (c === "PK") setCurrency("PKR");
        else if (["FR","DE","IT","ES","NL"].includes(c)) setCurrency("EUR");
        else if (c === "GB") setCurrency("GBP");
        else if (c === "AU") setCurrency("AUD");
        else if (["SA","AE","QA","KW"].includes(c)) setCurrency("SAR");
        else setCurrency("USD");
      })
      .catch(() => setCurrency("USD"));
  }, []);

  // 💱 Fetch exchange rates (PKR base)
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/PKR")
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(() => setRates({ PKR: 1 }));
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currency,              // "USD"
        symbol: SYMBOLS[currency], // "$"
        rates,                 // exchange rates
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

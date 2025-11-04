import React, { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({ symbol: "$", code: "US" });

  const currencyRates = {
    PK: { symbol: "Rs.", value: 500 },
    EU: { symbol: "€", value: 15 },
    GB: { symbol: "£", value: 12 },
    US: { symbol: "$", value: 15 },
    AU: { symbol: "A$", value: 15 },
    SA: { symbol: "﷼", value: 20 },
  };

  const getPriceByCountry = (code) => {
    if (code === "PK") return currencyRates.PK;
    if (["FR", "DE", "IT", "ES", "NL"].includes(code)) return currencyRates.EU;
    if (code === "GB") return currencyRates.GB;
    if (["US", "CA"].includes(code)) return currencyRates.US;
    if (code === "AU") return currencyRates.AU;
    if (["SA", "AE", "QA", "KW"].includes(code)) return currencyRates.SA;
    return currencyRates.US;
  };

  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => res.json())
      .then((data) => {
        const userCountry = data.country_code;
        setCurrency({
          ...getPriceByCountry(userCountry),
          code: userCountry,
        });
      })
      .catch(() => {
        setCurrency({ ...getPriceByCountry("US"), code: "US" });
      });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

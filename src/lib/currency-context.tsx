import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { type CurrencyCode, formatPrice, convertPrice, CURRENCIES } from "./currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountPKR: number) => string;
  convertPrice: (amountPKR: number) => number;
  currencies: typeof CURRENCIES;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "vc_currency";

function getStoredCurrency(): CurrencyCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "PKR" || stored === "USD") return stored;
  } catch {}
  return "PKR";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(getStoredCurrency);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem(STORAGE_KEY, c); } catch {}
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrency(currency === "PKR" ? "USD" : "PKR");
  }, [currency, setCurrency]);

  useEffect(() => {
    const stored = getStoredCurrency();
    if (stored !== currency) setCurrencyState(stored);
  }, []);

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    formatPrice: (amountPKR) => formatPrice(amountPKR, currency),
    convertPrice: (amountPKR) => convertPrice(amountPKR, currency),
    currencies: CURRENCIES,
    toggleCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

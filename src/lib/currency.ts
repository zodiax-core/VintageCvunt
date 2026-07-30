export type CurrencyCode = "PKR" | "USD";

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: "PKR", symbol: "Rs", label: "PKR (Rs)" },
  { code: "USD", symbol: "$", label: "USD ($)" },
];

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  PKR: 1,
  USD: 0.003571,
};

export function convertPrice(amountPKR: number, to: CurrencyCode): number {
  return amountPKR * EXCHANGE_RATES[to];
}

export function formatPrice(amount: number, currency: CurrencyCode): string {
  if (currency === "PKR") {
    return "PKR " + Math.round(amount).toLocaleString("en-PK");
  }
  const converted = convertPrice(amount, currency);
  return "$" + converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

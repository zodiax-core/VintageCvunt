import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/currency-context-Bd4Aavn6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY$1 = "vc_cart";
function reducer(state, action) {
	switch (action.type) {
		case "ADD_ITEM": {
			const { product, qty = 1 } = action.payload;
			if (state.items.find((i) => i.id === product.id)) return { items: state.items.map((i) => i.id === product.id ? {
				...i,
				quantity: i.quantity + qty
			} : i) };
			return { items: [...state.items, {
				...product,
				quantity: qty
			}] };
		}
		case "REMOVE_ITEM": return { items: state.items.filter((i) => i.id !== action.payload.id) };
		case "UPDATE_QTY": {
			const { id, qty } = action.payload;
			if (qty <= 0) return { items: state.items.filter((i) => i.id !== id) };
			return { items: state.items.map((i) => i.id === id ? {
				...i,
				quantity: qty
			} : i) };
		}
		case "CLEAR_CART": return { items: [] };
		default: return state;
	}
}
function loadCart() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY$1);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && Array.isArray(parsed.items)) return parsed;
		}
	} catch {}
	return { items: [] };
}
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [cart, dispatch] = (0, import_react.useReducer)(reducer, { items: [] });
	(0, import_react.useEffect)(() => {
		const loaded = loadCart();
		if (loaded.items.length > 0) {
			dispatch({ type: "CLEAR_CART" });
			loaded.items.forEach((item) => {
				dispatch({
					type: "ADD_ITEM",
					payload: {
						product: item,
						qty: item.quantity
					}
				});
			});
		}
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE_KEY$1, JSON.stringify(cart));
	}, [cart]);
	const addToCart = (product, qty = 1) => dispatch({
		type: "ADD_ITEM",
		payload: {
			product,
			qty
		}
	});
	const removeFromCart = (id) => dispatch({
		type: "REMOVE_ITEM",
		payload: { id }
	});
	const updateQuantity = (id, qty) => dispatch({
		type: "UPDATE_QTY",
		payload: {
			id,
			qty
		}
	});
	const clearCart = () => dispatch({ type: "CLEAR_CART" });
	const cartTotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			cart,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			cartTotal,
			cartCount
		},
		children
	});
}
function useCartContext() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCartContext must be used within CartProvider");
	return ctx;
}
var CURRENCIES = [{
	code: "PKR",
	symbol: "Rs",
	label: "PKR (Rs)"
}, {
	code: "USD",
	symbol: "$",
	label: "USD ($)"
}];
var EXCHANGE_RATES = {
	PKR: 1,
	USD: .003571
};
function convertPrice(amountPKR, to) {
	return amountPKR * EXCHANGE_RATES[to];
}
function formatPrice(amount, currency) {
	if (currency === "PKR") return "PKR " + Math.round(amount).toLocaleString("en-PK");
	return "$" + convertPrice(amount, currency).toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
var CurrencyContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "vc_currency";
function getStoredCurrency() {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "PKR" || stored === "USD") return stored;
	} catch {}
	return "PKR";
}
function CurrencyProvider({ children }) {
	const [currency, setCurrencyState] = (0, import_react.useState)(() => getStoredCurrency());
	const setCurrency = (0, import_react.useCallback)((c) => {
		setCurrencyState(c);
		try {
			localStorage.setItem(STORAGE_KEY, c);
		} catch {}
	}, []);
	const toggleCurrency = (0, import_react.useCallback)(() => {
		setCurrencyState((prev) => {
			const next = prev === "PKR" ? "USD" : "PKR";
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {}
			return next;
		});
	}, []);
	const value = {
		currency,
		setCurrency,
		formatPrice: (0, import_react.useCallback)((amountPKR) => formatPrice(amountPKR, currency), [currency]),
		convertPrice: (0, import_react.useCallback)((amountPKR) => convertPrice(amountPKR, currency), [currency]),
		currencies: CURRENCIES,
		toggleCurrency
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyContext.Provider, {
		value,
		children
	});
}
function useCurrency() {
	const ctx = (0, import_react.useContext)(CurrencyContext);
	if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
	return ctx;
}
//#endregion
export { useCurrency as i, CurrencyProvider as n, useCartContext as r, CartProvider as t };

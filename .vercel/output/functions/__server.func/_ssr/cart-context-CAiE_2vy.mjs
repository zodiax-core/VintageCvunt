import { o as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-context-CAiE_2vy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "vc_cart";
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
		const raw = localStorage.getItem(STORAGE_KEY);
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
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
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
//#endregion
export { useCartContext as n, CartProvider as t };

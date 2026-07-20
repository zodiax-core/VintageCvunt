import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-boots-yUznlmdZ.js
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
	const [cart, dispatch] = (0, import_react.useReducer)(reducer, void 0, loadCart);
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
		"data-tsd-source": "/src/lib/cart-context.tsx:94:5",
		children
	});
}
function useCartContext() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCartContext must be used within CartProvider");
	return ctx;
}
var editorial_1_default$1 = "/assets/editorial-1-D3rgpRoR.jpg";
var editorial_2_default$1 = "/assets/editorial-2-8RJuX1gc.jpg";
var product_ring_default$1 = "/assets/product-ring-BA7MlDfG.jpg";
var product_jacket_default$1 = "/assets/product-jacket-DPDTWWFf.jpg";
var product_chain_default$1 = "/assets/product-chain-DGOeWrtB.jpg";
var product_boots_default$1 = "/assets/product-boots-DIlAebCu.jpg";
var editorial_1_default = "/assets/editorial-1-BrSs0-Sl.webp";
var editorial_2_default = "/assets/editorial-2-D1fiFcYq.webp";
var product_ring_default = "/assets/product-ring-DR2POQjK.webp";
var product_jacket_default = "/assets/product-jacket-DrU1o3KE.webp";
var product_chain_default = "/assets/product-chain-BfrTm7do.webp";
var product_boots_default = "/assets/product-boots-Tj6A_5Qm.webp";
//#endregion
export { editorial_2_default$1 as a, product_chain_default as c, product_jacket_default$1 as d, product_ring_default as f, editorial_2_default as i, product_chain_default$1 as l, useCartContext as m, editorial_1_default as n, product_boots_default as o, product_ring_default$1 as p, editorial_1_default$1 as r, product_boots_default$1 as s, CartProvider as t, product_jacket_default as u };

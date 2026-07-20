import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  src: string;
  webp: string;
  price: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Omit<CartItem, "quantity">; qty?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QTY"; payload: { id: number; qty: number } }
  | { type: "CLEAR_CART" };

const STORAGE_KEY = "vc_cart";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: qty }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) return { items: state.items.filter((i) => i.id !== id) };
      return { items: state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)) };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    }
  } catch {}
  return { items: [] };
}

const CartContext = createContext<{
  cart: CartState;
  addToCart: (product: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">, qty = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, qty } });

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const updateQuantity = (id: number, qty: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartTotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}

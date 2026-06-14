import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useAuth } from "../auth/AuthContext";

const CartContext = createContext(null);

function storageKey(username) {
  return username ? `cart:${username}` : "cart:guest";
}

export function CartProvider({ children }) {
  const { username } = useAuth();
  const [items, setItems] = useState([]);
  const skipSave = useRef(true);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey(username));
    skipSave.current = true;
    setItems(stored ? JSON.parse(stored) : []);
  }, [username]);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    localStorage.setItem(storageKey(username), JSON.stringify(items));
  }, [items, username]);

  function addItem(product, quantityKg) {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantityKg: item.quantityKg + quantityKg }
            : item,
        );
      }
      return [...current, { product, quantityKg }];
    });
  }

  function removeItem(productId) {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.length;
  const total = items.reduce(
    (sum, item) => sum + Number(item.product.price_per_kg) * item.quantityKg,
    0,
  );

  const value = { items, addItem, removeItem, clear, count, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

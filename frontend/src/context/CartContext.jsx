import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const CART_KEY = 'velcura_cart';

export const CartProvider = ({ children }) => {
  // Hydrate from localStorage on first load
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // localStorage not available
    }
  }, [items]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      }
      return [...prev, { ...product, qty: quantity }];
    });
    toast.success(`${product.name} added to cart!`);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.success('Item removed from cart.');
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      total,
      cartTotal: total,
      count,
      cartCount: count,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};

import { useState, useEffect } from 'react';

const KEY = 'velcura_recently_viewed';
const MAX = 4;

export function useRecentlyViewed() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  const addItem = (product) => {
    setItems(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { items, addItem };
}

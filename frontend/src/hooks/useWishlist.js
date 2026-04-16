import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('velcura_wishlist')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('velcura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (product) =>
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );

  const isWishlisted = (id) => wishlist.some(p => p.id === id);

  return { wishlist, toggle, isWishlisted, count: wishlist.length };
}

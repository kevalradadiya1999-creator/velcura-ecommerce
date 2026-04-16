import { createContext, useContext } from 'react';
import { useWishlist } from '../hooks/useWishlist';

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const wishlist = useWishlist();
  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlistContext must be inside WishlistProvider');
  return ctx;
};

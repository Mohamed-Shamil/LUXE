import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
      setWishlist(prev => {
          const exists = prev.find(p => p.id === product.id);
          if (exists) {
              return prev.filter(p => p.id !== product.id);
          } else {
              return [...prev, product];
          }
      });
  };

  const isInWishlist = (productId) => {
      return wishlist.some(p => p.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

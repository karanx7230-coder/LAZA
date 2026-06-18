import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        // Agar pehle se hai, toh remove kar do (Unlike)
        return prev.filter((item) => item.id !== product.id);
      } else {
        // Agar nahi hai, toh add kar do (Like)
        return [...prev, product];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
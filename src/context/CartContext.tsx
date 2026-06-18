import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [Cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        
        return prev;
      } else {
        
        return [...prev, product];
      }
    });
  };
const removeFromCart = (productId: any) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };
  const increaseQuantity = (id: any) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    )
  );
};

const decreaseQuantity = (id: any) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};
  return (
    <CartContext.Provider value={{ Cart, addToCart,removeFromCart ,decreaseQuantity,increaseQuantity}}>
      {children} 
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
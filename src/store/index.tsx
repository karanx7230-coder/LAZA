import React, { createContext, useContext } from 'react';
import createWishlistStore from './WishlistStore';

class RootStore {
  wishlist = createWishlistStore();
}

const rootStore = new RootStore();
const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);

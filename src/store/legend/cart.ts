import { observable } from '@legendapp/state';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
  quantity: number;
  [key: string]: any;
}

export const cart$ = observable({ items: [] as CartItem[] });

export const addToCart = (item: CartItem) => cart$.items.push(item);

export const removeFromCart = (id: string) =>
  cart$.items.set(items => items.filter(i => i.id !== id));
export const increaseQuantity = (id: string) => {
  const idx = cart$.items.get().findIndex(i => i.id === id);
  if (idx !== -1) {
    cart$.items[idx].quantity.set((q: number) => q + 1);
  }
};

export const decreaseQuantity = (id: string) => {
  const idx = cart$.items.get().findIndex(i => i.id === id);
  if (idx !== -1 && cart$.items[idx].quantity.get() > 1) {
    cart$.items[idx].quantity.set((q: number) => q - 1);
  }
};

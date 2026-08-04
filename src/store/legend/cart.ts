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
  cart$.items.set(items => items.filter(item => item.id !== id));
export const increaseQuantity = (id: string) => {
  const index = cart$.items.get().findIndex(item => item.id === id);
  if (index !== -1) {
    cart$.items[index].quantity.set((quantity: number) => quantity + 1);
  }
};

export const decreaseQuantity = (id: string) => {
  const index = cart$.items.get().findIndex(item => item.id === id);
  if (index !== -1 && cart$.items[index].quantity.get() > 1) {
    cart$.items[index].quantity.set((quantity: number) => quantity - 1);
  }
};

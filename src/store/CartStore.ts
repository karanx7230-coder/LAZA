import { makeAutoObservable } from 'mobx';

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  thumbnail?: string;
  quantity: number;
  [key: string]: any;
}

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get count() {
    return this.items.length;
  }

  get subtotal() {
    return this.items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0,
    );
  }

  get shippingCost() {
    return this.items.length > 1 ? 15 : 5;
  }

  get totalAmount() {
    return this.subtotal + this.shippingCost;
  }

  addToCart(product: CartItem) {
    const exists = this.items.find(item => item.id === product.id);
    if (!exists) {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number | string) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  increaseQuantity(id: number | string) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(id: number | string) {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  clearCart() {
    this.items = [];
  }
}

export default CartStore;

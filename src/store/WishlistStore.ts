import { makeAutoObservable } from 'mobx';

export interface wishlistItem {
  id: number | string;
  title: string;
  price: number;
  [key: string]: any;
}

class wishlistStore {
  items: wishlistItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  isInWishlist(id: number | string) {
    return this.items.some(item => item.id === id);
  }
  toggleWishlist(product: wishlistItem) {
    const exists = this.items.find(item => item.id === product.id);

    if (exists) {
      this.items = this.items.filter(item => item.id !== product.id);
    } else {
      this.items.push({ ...product });
    }
  }
  clearwishlist() {
    this.items = [];
  }
}

export default wishlistStore;

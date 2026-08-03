import { observable } from 'mobx';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  [key: string]: any;
}

function createWishlistStore() {
  //state
  const store = observable({
    items: [] as WishlistItem[],
    //funcction to check
    isInWishlist(id: string) {
      return !!store.items.find(item => item.id === id);
    },
    // function to add and remove
    toggleWishlist(product: WishlistItem) {
      //if the product is already in the wishlist
      if (store.items.find(item => item.id === product.id)) {
        store.items = store.items.filter(item => item.id !== product.id);
      } else {
        store.items.push({ ...product });
      }
    },
  });

  return store;
}

export default createWishlistStore;

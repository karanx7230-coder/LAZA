export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;
  images?: string[];
  category?: string;
  rating?: number;
  stock?: number;
  brand?: string;
  discountPercentage?: number;
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

export interface User {
  uid: string;
  name: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
}

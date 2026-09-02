export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail?: string;
}

export interface Product {
  id: number;
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
  availabilityStatus?: string;
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
export interface Userapi {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  image: string;
  accessToken: string;
  refreshToken: string;
}
export interface ShippingAddress {
  name: string;
  city: string;
  country: string;
  phone: string;
  fulladdress: string;
}

export interface PaymentSnapshot {
  owner: string;
  last4: string;
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  payment: PaymentSnapshot;
}

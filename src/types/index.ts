export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  sustainable: boolean;
  featured: boolean;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isSeller: boolean;
}
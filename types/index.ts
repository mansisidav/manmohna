// types/index.ts
export interface Category {
  _id: string;
  name: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string; 
  name: string;
  shortDescription?: string;
  longDescription?: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  category?: string | Category;
  sku?: string;
  stock?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

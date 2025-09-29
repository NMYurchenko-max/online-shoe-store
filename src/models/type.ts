// src/models/type.ts

export interface BannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  image?: string;
}

export interface Item {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
  brand?: string;
  color?: string;
  material?: string;
  season?: string;
  reason?: string;
  sizes?: { size: string; available: boolean }[];
}

export interface Category {
  id: number;
  title: string;
}

export interface CartItem {
  id: number;
  productId: number;
  size: string;
  count: number;
  price: number;
  title: string;
  image: string;
}

export interface Order {
  owner: { phone: string; address: string };
  items: { id: number; price: number; count: number }[];
}

export interface ProductCardProps {
  item: Item;
  addToCart: (item: Item, size: string) => void;
}

export interface TopSalesProps {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export interface CatalogProps {
  items: Item[];
  loading: boolean;
  error: string | null;
  categoryId: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: number) => void;
}

export interface CartProps {
  items: CartItem[];
  totalCount: number;
  removeFromCart: (id: number) => void;
  updateCount: (id: number, count: number) => void;
  checkout: () => void;
}

export interface ProductPageProps {
  item: Item | null;
  loading: boolean;
  error: string | null;
  addToCart: (item: Item, size: string) => void;
}

export interface AppState {
  topSales: {
    items: Item[];
    loading: boolean;
    error: string | null;
  };
  categories: {
    items: Category[];
    loading: boolean;
    error: string | null;
  };
  catalog: {
    items: Item[];
    loading: boolean;
    error: string | null;
    categoryId: number;
    searchQuery: string;
    offset: number;
    hasMore: boolean;
  };
  item: {
    item: Item | null;
    loading: boolean;
    error: string | null;
  };
  cart: {
    items: CartItem[];
    totalCount: number;
  };
  order: {
    sending: boolean;
    success: boolean;
    error: string | null;
  };
}

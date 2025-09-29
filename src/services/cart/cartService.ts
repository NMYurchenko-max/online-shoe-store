import type { CartItem } from '@/models/type';

const CART_KEY = 'cart';

export const cartService = {
  getCart: (): CartItem[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  addItem: (item: CartItem): void => {
    const cart = cartService.getCart();
    const existingIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
    );
    if (existingIndex >= 0) {
      cart[existingIndex].count += item.count;
    } else {
      cart.push(item);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  updateItem: (productId: number, size: string, count: number): void => {
    const cart = cartService.getCart();
    const index = cart.findIndex(
      (item) => item.productId === productId && item.size === size
    );
    if (index >= 0) {
      if (count > 0) {
        cart[index].count = count;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  },

  removeItem: (productId: number, size: string): void => {
    const cart = cartService.getCart();
    const filteredCart = cart.filter(
      (item) => !(item.productId === productId && item.size === size)
    );
    localStorage.setItem(CART_KEY, JSON.stringify(filteredCart));
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
  },

  getTotalCount: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.count, 0);
  },

  getTotalPrice: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  },
};

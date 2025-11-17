import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/models/type';

/**
 * Интерфейс состояния корзины.
 * Содержит список товаров, общее количество позиций, общую стоимость и статус заказа.
 */
interface CartState {
  items: CartItem[];
  positionsCount: number;
  totalPrice: number;
  order: {
    sending: boolean;
    success: boolean;
    error: string | null;
  };
}

/**
 * Загружает состояние корзины из localStorage.
 * @returns Состояние корзины из хранилища или начальное состояние.
 */
const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      const items = parsed.items || [];
      return {
        items,
        positionsCount: items.length,
        totalPrice: items.reduce((sum: number, item: CartItem) => sum + item.price * item.count, 0),
        order: { sending: false, success: false, error: null },
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    items: [],
    positionsCount: 0,
    totalPrice: 0,
    order: { sending: false, success: false, error: null },
  };
};

/**
 * Сохраняет состояние корзины в localStorage.
 * @param state - Текущее состояние корзины.
 */
const saveCartToStorage = (state: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState: CartState = loadCartFromStorage();

/**
 * Обновляет общие показатели корзины (количество позиций и общую стоимость).
 * @param state - Состояние корзины.
 */
const updateTotals = (state: CartState) => {
  state.positionsCount = state.items.length;
  state.totalPrice = state.items.reduce((sum: number, item: CartItem) => sum + item.price * item.count, 0);
};

/**
 * Slice для управления состоянием корзины.
 * Обрабатывает добавление, удаление товаров, обновление количества и оформление заказа.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: number; size: string; count: number; price: number; title: string; image: string }>) => {
      const { productId, size, count, price, title, image } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId && item.size === size);
      if (existingItem) {
        existingItem.count += count;
      } else {
        const newItem: CartItem = {
          id: Date.now(), // temporary id for cart item
          productId,
          size,
          count,
          price,
          title,
          image,
        };
        state.items.push(newItem);
      }
      // Reset order state on adding items to allow accumulating a new cart
      state.order.sending = false;
      state.order.success = false;
      state.order.error = null;
      updateTotals(state);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      updateTotals(state);
      saveCartToStorage(state);
    },
    updateCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
        if (item.count <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      updateTotals(state);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      updateTotals(state);
      saveCartToStorage(state);
    },
    sendOrderRequest: (state, action: PayloadAction<{ phone: string; address: string; items: { id: number; price: number; count: number }[] }>) => {
      // Saga trigger action: state changes are handled by sendOrderStart/Success/Failure
      // No state changes here, just triggering the saga
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      [state, action];
    },
    sendOrderStart: (state) => {
      state.order.sending = true;
      state.order.success = false;
      state.order.error = null;
    },
    sendOrderSuccess: (state) => {
      state.order.sending = false;
      state.order.success = true;
      state.order.error = null;
      state.items = [];
      updateTotals(state);
      saveCartToStorage(state);
    },
    sendOrderFailure: (state, action: PayloadAction<string>) => {
      state.order.sending = false;
      state.order.success = false;
      state.order.error = action.payload;
    },
    resetOrder: (state) => {
      state.order.sending = false;
      state.order.success = false;
      state.order.error = null;
    },
  },
});

export const { addToCart, removeFromCart, updateCount, clearCart, sendOrderRequest, sendOrderStart, sendOrderSuccess, sendOrderFailure, resetOrder } = cartSlice.actions;
export default cartSlice.reducer;

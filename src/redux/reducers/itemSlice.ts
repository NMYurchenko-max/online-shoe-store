import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/models/type';

/**
 * Интерфейс состояния товара.
 * Содержит данные о товаре, статус загрузки и ошибку.
 */
interface ItemState {
  item: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  item: null,
  loading: false,
  error: null,
};

/**
 * Slice для управления состоянием товара.
 * Обрабатывает загрузку данных о товаре.
 */
const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    fetchItemStart: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
      //action.payload — это идентификатор элемента, но он не используется в редукторе
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      [action];
    },
    fetchItemSuccess: (state, action: PayloadAction<Item>) => {
      state.loading = false;
      state.item = action.payload;
    },
    fetchItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchItemStart, fetchItemSuccess, fetchItemFailure } = itemSlice.actions;
export default itemSlice.reducer;

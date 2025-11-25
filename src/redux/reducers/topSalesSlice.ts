import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/models/type';

/**
 * Состояние для хранения данных о самых продаваемых товарах
 * @property {Item[]} items - Массив самых продаваемых товаров
 * @property {boolean} loading - Флаг загрузки данных
 * @property {string | null} error - Сообщение об ошибке, если она произошла
 */
interface TopSalesState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

/**
 * Начальное состояние для самых продаваемых товаров
 * @type {TopSalesState}
 */
const initialState: TopSalesState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    /**
     * Начинает процесс получения самых продаваемых товаров
     * Устанавливает флаг загрузки в true и очищает ошибки
     */
    fetchTopSalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    /**
     * Успешно получает самые продаваемые товары
     * @param {Item[]} payload - Массив самых продаваемых товаров
     */
    fetchTopSalesSuccess: (state, action: PayloadAction<Item[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    /**
     * Обрабатывает ошибку при получении самых продаваемых товаров
     * @param {string} payload - Сообщение об ошибке
     */
    fetchTopSalesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

/**
 * Экспортируемые действия для управления состоянием самых продаваемых товаров
 */
export const { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } = topSalesSlice.actions;
/**
 * Редьюсер для управления состоянием самых продаваемых товаров
 */
export default topSalesSlice.reducer;

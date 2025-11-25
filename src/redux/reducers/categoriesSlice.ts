import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/models/type';

/**
 * Состояние категорий товаров в Redux хранилище
 * @interface CategoriesState
 * @property {Category[]} items - Массив категорий товаров
 * @property {boolean} loading - Флаг загрузки данных
 * @property {string | null} error - Сообщение об ошибке, если есть
 */
interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * Начальное состояние для слайса категорий
 * @type {CategoriesState}
 */
const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Redux слайс для управления категориями товаров
 * Содержит состояние и редьюсеры для загрузки категорий
 * @typedef {Object} categoriesSlice
 */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    /**
     * Экшен начала загрузки категорий
     * Устанавливает флаг загрузки в true и очищает ошибки
     * @param {CategoriesState} state - Текущее состояние
     */
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    /**
     * Экшен успешной загрузки категорий
     * Устанавливает загруженные категории и сбрасывает флаг загрузки
     * @param {CategoriesState} state - Текущее состояние
     * @param {PayloadAction<Category[]>} action - Экшен с данными категорий
     */
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      console.log('categoriesSlice: fetchCategoriesSuccess', action.payload);
      state.loading = false;
      state.items = action.payload;
    },
    /**
     * Экшен ошибки при загрузке категорий
     * Устанавливает сообщение об ошибке и сбрасывает флаг загрузки
     * @param {CategoriesState} state - Текущее состояние
     * @param {PayloadAction<string>} action - Экшен с сообщением об ошибке
     */
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;
export default categoriesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/models/type';

/**
 * Интерфейс состояния каталога.
 */
interface CatalogState {
  /**
   * Список товаров в каталоге.
   */
  items: Item[];
  /**
   * Статус загрузки.
   */
  loading: boolean;
  /**
   * Текст ошибки, если есть.
   */
  error: string | null;
  /**
   * Id выбранной категории.
   */
  categoryId: number;
  /**
   * Строка поискового запроса.
   */
  searchQuery: string;
  /**
   * Индекс смещения (offset) для пагинации.
   */
  offset: number;
  /**
   * Флаг наличия дополнительных товаров для подгрузки.
   */
  hasMore: boolean;
}

/**
 * Начальное состояние каталога.
 */
const initialState: CatalogState = {
  items: [],
  loading: false,
  error: null,
  categoryId: 0,
  searchQuery: '',
  offset: 0,
  hasMore: true,
};

/**
 * Slice каталога с редьюсерами для загрузки, установки фильтров и обработки ошибок.
 */
const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    /**
     * Запуск загрузки каталога.
     */
    fetchCatalogStart: (state, action: PayloadAction<{ categoryId?: number; q?: string; offset?: number }>) => {
      state.loading = true;
      state.error = null;
      if (action.payload.categoryId !== undefined) state.categoryId = action.payload.categoryId;
      if (action.payload.q !== undefined) state.searchQuery = action.payload.q;
      if (action.payload.offset !== undefined) {
        state.offset = action.payload.offset;
        if (action.payload.offset === 0) {
          state.items = [];
        }
      }
    },
    /**
     * Успешная загрузка каталога.
     */
    fetchCatalogSuccess: (state, action: PayloadAction<{ items: Item[]; offset: number }>) => {
      state.loading = false;

      if (action.payload.offset === 0) {
        state.items = action.payload.items;
      } else {
        state.items = [...state.items, ...action.payload.items];
      }
      state.hasMore = action.payload.items.length === 6; // assuming page size 6
    },
    /**
     * Ошибка при загрузке каталога.
     */
    fetchCatalogFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    /**
     * Установка выбранной категории.
     */
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    /**
     * Установка поискового запроса.
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

  },
});

export const { fetchCatalogStart, fetchCatalogSuccess, fetchCatalogFailure, setCategoryId, setSearchQuery } = catalogSlice.actions;
export default catalogSlice.reducer;

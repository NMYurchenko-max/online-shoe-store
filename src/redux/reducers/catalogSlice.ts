import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/models/type';

interface CatalogState {
  items: Item[];
  loading: boolean;
  error: string | null;
  categoryId: number;
  searchQuery: string;
  offset: number;
  hasMore: boolean;
}

const initialState: CatalogState = {
  items: [],
  loading: false,
  error: null,
  categoryId: 0,
  searchQuery: '',
  offset: 0,
  hasMore: true,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
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
    fetchCatalogSuccess: (state, action: PayloadAction<{ items: Item[]; offset: number }>) => {
      state.loading = false;

      if (action.payload.offset === 0) {
        state.items = action.payload.items;
      } else {
        state.items = [...state.items, ...action.payload.items];
      }
      state.hasMore = action.payload.items.length === 6; // assuming page size 6
    },
    fetchCatalogFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

  },
});

export const { fetchCatalogStart, fetchCatalogSuccess, fetchCatalogFailure, setCategoryId, setSearchQuery } = catalogSlice.actions;
export default catalogSlice.reducer;

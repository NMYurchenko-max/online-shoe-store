import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '@/models/type';

interface TopSalesState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: TopSalesState = {
  items: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    fetchTopSalesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopSalesSuccess: (state, action: PayloadAction<Item[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTopSalesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } = topSalesSlice.actions;
export default topSalesSlice.reducer;

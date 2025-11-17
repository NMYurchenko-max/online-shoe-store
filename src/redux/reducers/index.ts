import { combineReducers } from '@reduxjs/toolkit';
import topSalesReducer from './topSalesSlice';
import categoriesReducer from './categoriesSlice';
import catalogReducer from './catalogSlice';
import itemReducer from './itemSlice';
import cartReducer from './cartSlice';

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
  item: itemReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

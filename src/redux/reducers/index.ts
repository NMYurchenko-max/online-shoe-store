import { combineReducers } from '@reduxjs/toolkit';
import topSalesReducer from './topSalesSlice';
import categoriesReducer from './categoriesSlice';
import catalogReducer from './catalogSlice';

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  catalog: catalogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

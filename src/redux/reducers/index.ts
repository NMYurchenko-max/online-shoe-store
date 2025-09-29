import { combineReducers } from '@reduxjs/toolkit';
import topSalesReducer from './topSalesSlice';

export const rootReducer = combineReducers({
  topSales: topSalesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

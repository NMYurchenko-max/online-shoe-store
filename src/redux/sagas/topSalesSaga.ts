// src/redux/sagas/topSalesSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { apiService } from '@/services/api/apiService';
import { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } from '../reducers/topSalesSlice';

function* fetchTopSales() {
  try {
    const items: Awaited<ReturnType<typeof apiService.getTopSales>> = yield call(apiService.getTopSales);
    yield put(fetchTopSalesSuccess(items));
  } catch (error) {
    yield put(fetchTopSalesFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export default function* topSalesSaga() {
  yield takeEvery(fetchTopSalesStart.type, fetchTopSales);
}

import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { apiService } from '@/services/api/apiService';
import { fetchTopSalesStart, fetchTopSalesSuccess, fetchTopSalesFailure } from '../reducers/topSalesSlice';

/**
 * Saga для загрузки хитов продаж.
 * Выполняет запрос к API, при ошибках с таймаутом – повторяет до 3 раз.
 */
function* fetchTopSales() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const items: Awaited<ReturnType<typeof apiService.getTopSales>> = yield call(apiService.getTopSales);
      yield put(fetchTopSalesSuccess(items));
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('timeout') && retries < maxRetries - 1) {
        retries += 1;
        yield delay(1000);
        continue;
      }
      yield put(fetchTopSalesFailure(errorMessage));
      return;
    }
  }
}

/**
 * Watcher saga для хитов продаж.
 * Слушает действия fetchTopSalesStart и запускает fetchTopSales.
 */
export default function* topSalesSaga() {
  yield takeEvery(fetchTopSalesStart.type, fetchTopSales);
}

import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { apiService } from '@/services/api/apiService';
import {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
} from '../reducers/catalogSlice';
import type { RootState } from '../reducers';

function* fetchCatalog(action: ReturnType<typeof fetchCatalogStart>) {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const state: RootState = yield select();
      const { categoryId, searchQuery } = state.catalog;
      const offset = action.payload.offset || 0;
      const params = {
        categoryId: categoryId,
        q: searchQuery || undefined,
        offset,
      };
      const items: Awaited<ReturnType<typeof apiService.getItems>> = yield call(apiService.getItems, params);
      yield put(fetchCatalogSuccess({ items, offset }));
      return; // Success, exit
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('timeout') && retries < maxRetries - 1) {
        retries += 1;
        yield delay(1000); // Wait 1 second before retry
        continue;
      }
      yield put(fetchCatalogFailure(errorMessage));
      return;
    }
  }
}

export default function* catalogSaga() {
  yield takeLatest(fetchCatalogStart.type, fetchCatalog);
}

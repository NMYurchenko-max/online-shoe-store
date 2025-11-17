import { call, put, takeLatest } from 'redux-saga/effects';
import { apiService } from '@/services/api/apiService';
import {
  fetchItemStart,
  fetchItemSuccess,
  fetchItemFailure,
} from '../reducers/itemSlice';

/**
 * Saga для загрузки данных о товаре.
 * @param action - Действие с ID товара.
 */
function* fetchItem(action: ReturnType<typeof fetchItemStart>) {
  try {
    const item: Awaited<ReturnType<typeof apiService.getItem>> = yield call(apiService.getItem, action.payload);
    yield put(fetchItemSuccess(item));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    yield put(fetchItemFailure(errorMessage));
  }
}

/**
 * Корневая saga для товара.
 * Прослушивает действия fetchItemStart.
 */
export default function* itemSaga() {
  yield takeLatest(fetchItemStart.type, fetchItem);
}

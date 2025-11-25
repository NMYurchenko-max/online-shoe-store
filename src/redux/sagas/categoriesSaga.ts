import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { apiService } from '@/services/api/apiService';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from '../reducers/categoriesSlice';

/**
 * Saga для загрузки категорий.
 * Выполняет запрос к API с повторной попыткой при ошибках, включая таймаут.
 */
function* fetchCategories() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const categories: Awaited<ReturnType<typeof apiService.getCategories>> = yield call(apiService.getCategories);
      yield put(fetchCategoriesSuccess(categories));
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('timeout') && retries < maxRetries - 1) {
        retries += 1;
        yield delay(1000);
        continue;
      }
      yield put(fetchCategoriesFailure(errorMessage));
      return;
    }
  }
}

/**
 * Watcher saga категорий.
 * Прослушивает действие fetchCategoriesStart и запускает fetchCategories.
 */
export default function* categoriesSaga() {
  yield takeEvery(fetchCategoriesStart.type, fetchCategories);
}

import { all } from 'redux-saga/effects';
import topSalesSaga from './topSalesSaga';
import categoriesSaga from './categoriesSaga';
import catalogSaga from './catalogSaga';
import itemSaga from './itemSaga';
import { watchSendOrder } from './orderSaga';

/**
 * Корневая сага, которая объединяет все саги приложения.
 *
 * @description
 * Эта сага используется для запуска всех других саг в приложении.
 * Она объединяет саги для получения хитов продаж, категорий, каталога,
 * отдельных товаров и обработки заказов.
 */
export default function* rootSaga() {
  yield all([
    topSalesSaga(),
    categoriesSaga(),
    catalogSaga(),
    itemSaga(),
    watchSendOrder(),
  ]);
}

import { all } from 'redux-saga/effects';
import topSalesSaga from './topSalesSaga';
import categoriesSaga from './categoriesSaga';
import catalogSaga from './catalogSaga';
import itemSaga from './itemSaga';
import { watchSendOrder } from './orderSaga';

export default function* rootSaga() {
  yield all([
    topSalesSaga(),
    categoriesSaga(),
    catalogSaga(),
    itemSaga(),
    watchSendOrder(),
  ]);
}

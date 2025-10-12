import { all } from 'redux-saga/effects';
import topSalesSaga from './topSalesSaga';
import categoriesSaga from './categoriesSaga';
import catalogSaga from './catalogSaga';

export default function* rootSaga() {
  yield all([
    topSalesSaga(),
    categoriesSaga(),
    catalogSaga(),
  ]);
}

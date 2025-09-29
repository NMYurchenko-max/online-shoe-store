import { all } from 'redux-saga/effects';
import topSalesSaga from './topSalesSaga';

export default function* rootSaga() {
  yield all([
    topSalesSaga(),
  ]);
}

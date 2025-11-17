import { call, put, takeEvery } from 'redux-saga/effects';
import { sendOrderRequest, sendOrderStart, sendOrderSuccess, sendOrderFailure } from '../reducers/cartSlice';

/**
 * Интерфейс действия отправки заказа.
 */
interface SendOrderAction {
  type: string;
  payload: {
    phone: string;
    address: string;
    items: { id: number; price: number; count: number }[];
  };
}

/**
 * Saga для отправки заказа.
 * @param action - Действие с данными заказа.
 */
function* sendOrderSaga(action: SendOrderAction): Generator {
  try {
    yield put(sendOrderStart());
    const response: Response = yield call(fetch, 'http://localhost:7070/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: {
          phone: action.payload.phone,
          address: action.payload.address,
        },
        items: action.payload.items,
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка при отправке заказа');
    }
    yield put(sendOrderSuccess());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    yield put(sendOrderFailure(message));
  }
}

/**
 * Watcher saga для отправки заказа.
 * Прослушивает действия sendOrderRequest.
 */
export function* watchSendOrder() {
  yield takeEvery(sendOrderRequest.type, sendOrderSaga);
}

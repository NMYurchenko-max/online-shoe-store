import { call, put, takeEvery } from 'redux-saga/effects';
import { sendOrderRequest, sendOrderStart, sendOrderSuccess, sendOrderFailure } from '../reducers/cartSlice';

// Базовый URL:
// - если задан VITE_API_BASE_URL (в т.ч. в dev), используем его напрямую
// - иначе в dev используем относительный путь через Vite proxy (/api → 7070)
// - в prod fallback на локальный 7070
const ENV = (import.meta as any).env || {};
const BASE_URL = ENV.VITE_API_BASE_URL || (ENV.DEV ? '' : 'http://localhost:7070');

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
  let success = false;
  try {
    yield put(sendOrderStart());
    const apiPath = '/api/order';
    const url = BASE_URL ? `${BASE_URL}${apiPath}` : apiPath;
    const response: Response = yield call(fetch, url, {
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

    // Любой 2xx считаем успехом
    if (response.status >= 200 && response.status < 300) {
      success = true;
      yield put(sendOrderSuccess());
      return;
    }

    // Иначе — формируем понятное сообщение ошибки
    let errorMessage = 'Ошибка при отправке заказа';
    try {
      const contentType = response.headers.get('Content-Type') || '';
      let errorData: any = null;
      if (contentType.includes('application/json')) {
        errorData = yield call([response, response.json]);
      } else {
        const text = yield call([response, response.text]);
        try {
          errorData = JSON.parse(text);
        } catch {
          if (text) errorMessage = text;
        }
      }
      if (errorData) {
        if (typeof errorData === 'string') {
          errorMessage = errorData || errorMessage;
        } else {
          errorMessage =
            errorData.error ||
            errorData.message ||
            (typeof errorData.result !== 'undefined'
              ? `Ошибка сервер�� (код: ${String(errorData.result)})`
              : errorMessage);
        }
      }
    } catch {
      // игнор ошибок парсинга тела
    }
    throw new Error(errorMessage);
  } catch (error: unknown) {
    // Если уже зафиксирован успех — не перезаписываем состояние ошибкой
    if (success) return;
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

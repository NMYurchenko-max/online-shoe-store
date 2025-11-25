import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers';
import rootSaga from '../sagas/rootSaga';

/**
 * Создает saga middleware для обработки саг в Redux
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Настраивает и создает Redux store с rootReducer и saga middleware
 * @description Конфигурирует store с корневым редюсером и добавляет saga middleware
 * @property {Function} reducer - Корневой редюсер приложения
 * @property {Function} middleware - Функция для настройки middleware, отключающая serializableCheck для действия 'persist/PERSIST'
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

// Запускает корневую сагу
sagaMiddleware.run(rootSaga);

/**
 * Тип состояния всего хранилища
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип функции dispatch хранилища
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;

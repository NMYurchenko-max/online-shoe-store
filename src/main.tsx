import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import AppRoutes from './routes/AppRoutes';

/**
 * Точка входа приложения.
 * Инициализирует React приложение с Redux Provider и рендерит маршруты.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import MainPage from '@/components/pages/MainPage/MainPage';
import AboutPage from '@/components/pages/AboutPage/AboutPage';
import ContactsPage from '@/components/pages/ContactsPage/ContactsPage';
import CatalogPage from '@/components/pages/CatalogPage/CatalogPage';
import ProductPage from '@/components/pages/ProductPage/ProductPage';
import CartPage from '@/components/pages/CartPage/CartPage';
import NotFoundPage from '@/components/pages/NotFoundPage/NotFoundPage';

/**
 * Базовый путь для роутера в зависимости от режима сборки.
 */
const basename = import.meta.env.MODE === 'production' ? '/online-shoe-store/' : '/';

/**
 * Конфигурация роутера приложения.
 * Определяет маршруты и соответствующие компоненты страниц.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  basename
});

/**
 * Компонент для предоставления роутера приложения.
 * Использует RouterProvider для управления навигацией.
 */
const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;

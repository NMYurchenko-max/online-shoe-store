import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';

/**
 * Основной компонент приложения.
 * Отвечает за общую структуру страницы с шапкой, основным содержимым и футером.
 * Использует Outlet для рендеринга дочерних маршрутов.
 */
const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;

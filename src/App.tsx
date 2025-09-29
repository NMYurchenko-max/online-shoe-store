// src/App.tsx
import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';

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

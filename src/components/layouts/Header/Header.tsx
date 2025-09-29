import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Banner from '@/components/entities/Banner/Banner';
import SearchWidget from '@/components/shared/widgets/SearchWidget';
import CartWidget from '@/components/shared/widgets/CartWidget';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Логотип */}
        <div className={styles.headerLogo}>
          <Link to="/">
            <img
              src="/img/header-logo.png"
              alt="Логотип"
              className={styles.logo}
            />
          </Link>
        </div>

        {/* Навигация */}
        <nav className={styles.headerNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Главная</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/catalog" className={styles.navLink}>Каталог</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/about" className={styles.navLink}>О магазине</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contacts" className={styles.navLink}>Контакты</Link>
            </li>
          </ul>
        </nav>

        {/* Панель управления */}
        <div className={styles.headerControls}>
          <SearchWidget />
          <CartWidget count={3} />
        </div>
      </div>

      {/* Баннер */}
      <Banner />
    </header>
  );
};

export default Header;

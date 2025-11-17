import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import styles from './Header.module.css';
import Banner from '@/components/entities/Banner/Banner';
import SearchWidget from '@/components/shared/widgets/SearchWidget';
import CartWidget from '@/components/shared/widgets/CartWidget';

/**
 * Компонент заголовка приложения.
 * Содержит логотип, навигацию, виджет поиска и корзины, а также баннер.
 */
const Header = () => {
  const { positionsCount } = useAppSelector((state) => state.cart);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Логотип */}
        <div className={styles.headerLogo}>
          <Link to="/">
            <div className={styles.logo}></div>
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
          <CartWidget count={positionsCount} />
        </div>
      </div>

      {/* Баннер */}
      <Banner />
    </header>
  );
};

export default Header;

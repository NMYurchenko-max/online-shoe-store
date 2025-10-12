import Catalog from '@/components/entities/Catalog/Catalog';
import TopSales from '@/components/entities/TopSales/TopSales';
import Categories from '@/components/shared/widgets/Categories';
import Preloader from '@/components/shared/Preloader';
import styles from './MainPage.module.css';
import { useAppSelector } from '@/hooks/useAppSelector';

const MainPage = () => {
  const catalogLoading = useAppSelector((state) => state.catalog.loading);

  return (
    <div className={styles.container}>
      {/* Хиты продаж */}
      <section className={styles.topSalesSection}>
        <h2 className={styles.sectionTitle}>Хиты продаж</h2>
        <TopSales />
      </section>

      {/* Каталог товаров */}
      <section className={styles.catalogSection}>
        <h2 className={styles.sectionTitle}>Каталог</h2>
        {catalogLoading && <Preloader show={true} />}
        <Categories />
        <Catalog />
      </section>
    </div>
  );
};

export default MainPage;

import Catalog from '@/components/entities/Catalog/Catalog';
import TopSales from '@/components/entities/TopSales/TopSales';
import Categories from '@/components/shared/widgets/Categories';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      {/* Хиты продаж */}
      <section className={styles.topSalesSection}>
        <h2 className={styles.sectionTitle}>Хиты продаж</h2>
        <TopSales />
      </section>

      {/* Категории каталога */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Каталог</h2>
        <Categories />
      </section>

      {/* Каталог товаров */}
      <section className={styles.catalogSection}>
        <Catalog />
      </section>
    </div>
  );
};

export default MainPage;

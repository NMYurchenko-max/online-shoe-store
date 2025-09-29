// src/components/pages/MainPage/MainPage.tsx

import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      {/* Топ продаж */}
      <section className={styles.topSalesSection}>
        <h2 className={styles.sectionTitle}>Топ продаж</h2>
        <p>Здесь будет отображаться список товаров.</p>
      </section>

      {/* Категории */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Категории</h2>
        <p>Все категории товаров...</p>
      </section>
    </div>
  );
};

export default MainPage;

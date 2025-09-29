//src / components / pages / NotFoundPage / NotFoundPage.tsx
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 — Страница не найдена</h1>
      <p className={styles.message}>Извините, такая страница не найдена!</p>
    </div>
  );
};

export default NotFoundPage;

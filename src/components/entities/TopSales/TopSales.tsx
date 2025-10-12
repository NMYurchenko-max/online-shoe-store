import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchTopSalesStart } from '@/redux/reducers/topSalesSlice';
import type { Item } from '@/models/type';
import Preloader from '@/components/shared/Preloader';
import ErrorMessage from '@/components/shared/ErrorMessage';
import styles from './TopSales.module.css';

const TopSales = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(fetchTopSalesStart());
  }, [dispatch]);

  if (loading) return <Preloader show={true} />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.topSalesContainer}>
      {items.map((item: Item) => (
        <div key={item.id} className={styles.topSalesItem}>
          <div className={styles.imageWrapper}>
            <img src={item.images[0]} alt={item.title} className={styles.topSalesImage} />
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.price}>{item.price} ₽</p>
            <button className={styles.orderButton}>Заказать</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSales;

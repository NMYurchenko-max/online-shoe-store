import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchTopSalesStart } from '@/redux/reducers/topSalesSlice';
import type { Item } from '@/models/type';
import Preloader from '@/components/shared/Preloader';
import ErrorMessage from '@/components/shared/ErrorMessage';
import styles from './TopSales.module.css';

/**
 * Компонент для отображения блока с товарами наибольшей популярностью
 * Загружает и отображает список 
 */
const TopSales = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Получение состояния загрузки товаров-хитов из Redux store
  const { items, loading, error } = useAppSelector((state) => state.topSales);

  // Загрузка товаров-хитов при монтировании компонента
  useEffect(() => {
    dispatch(fetchTopSalesStart());
  }, [dispatch]);

  // Отображение индикатора загрузки
  if (loading) return <Preloader show={true} />;
  // Отображение сообщения об ошибке при наличии ошибки
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
            <button className={styles.orderButton} onClick={() => navigate(`/product/${item.id}`)}>Заказать</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSales;

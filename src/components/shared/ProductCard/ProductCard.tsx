import React from 'react';
import type { Item } from '@/models/type';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  item: Item;
  onOrder?: (item: Item) => void;
}

/**
 * Компонент карточки товара.
 * Отображает информацию о товаре и предоставляет кнопку для заказа.
 *
 * @param item - Объект товара с информацией о нем
 * @param onOrder - Функция обратного вызова для обработки заказа товара
 */
const ProductCard: React.FC<ProductCardProps> = ({ item, onOrder }) => {
  const handleOrder = () => {
    if (onOrder) {
      onOrder(item);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img src={item.images[0]} alt={item.title} className={styles.productImage} />
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>{item.price} ₽</p>
        <button className={styles.orderButton} onClick={handleOrder}>
          Заказать
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchItemStart } from '@/redux/reducers/itemSlice';
import { addToCart } from '@/redux/reducers/cartSlice';
import type { Item } from '@/models/type';
import Preloader from '@/components/shared/Preloader';
import ErrorMessage from '@/components/shared/ErrorMessage';
import styles from './ProductPage.module.css';

/**
 * Компонент страницы товара.
 * Отображает детальную информацию о товаре, позволяет выбрать размер и количество,
 * и добавить товар в корзину.
 */
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { item, loading, error } = useAppSelector((state) => state.item);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemStart(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  const handleAddToCart = (item: Item, size: string) => {
    dispatch(addToCart({ productId: item.id, size, count: quantity, price: item.price, title: item.title, image: item.images[0] }));
    navigate('/cart');
  };

  if (loading) return <Preloader show={true} />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) return <div>Товар не найден</div>;

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img src={item.images[0]} alt={item.title} className={styles.productImage} />
        </div>
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.price}>{item.price} ₽</p>
          {item.brand && <p className={styles.brand}>Бренд: {item.brand}</p>}
          {item.color && <p className={styles.color}>Цвет: {item.color}</p>}
          {item.material && <p className={styles.material}>Материал: {item.material}</p>}
          {item.season && <p className={styles.season}>Сезон: {item.season}</p>}
          {item.reason && <p className={styles.reason}>Причина: {item.reason}</p>}

          <div className={styles.sizesContainer}>
            <h3>Размеры:</h3>
            <div className={styles.sizes}>
              {item.sizes?.filter(size => size.available).map((size) => (
                <button
                  key={size.size}
                  className={`${styles.sizeButton} ${selectedSize === size.size ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size.size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {item.sizes?.some(size => size.available) && (
            <div className={styles.quantityContainer}>
              <h3>Количество:</h3>
              <div className={styles.quantityControls}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))}>+</button>
              </div>
            </div>
          )}

          {item.sizes?.some(size => size.available) && selectedSize && (
            <button className={styles.addToCartButton} onClick={() => handleAddToCart(item, selectedSize)}>
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

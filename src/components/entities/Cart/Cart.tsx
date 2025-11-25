import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { removeFromCart, updateCount, sendOrderRequest, resetOrder } from '@/redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '@/models/type';
import styles from './Cart.module.css';

/**
 * Компонент корзины покупок.
 * Отображает список товаров в корзине, позволяет изменять количество,
 * удалять товары и оформлять заказ.
 */
const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, order } = useAppSelector((state) => state.cart);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);

  /**
   * Удаляет товар из корзины по идентификатору.
   * @param id - Идентификатор товара для удаления.
   */
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  /**
   * Обновляет количество товара в корзине.
   * @param id - Идентификатор товара.
   * @param count - Новое количество товара.
   */
  const handleUpdateCount = (id: number, count: number) => {
    dispatch(updateCount({ id, count }));
  };

  /**
   * Оформляет заказ, отправляя данные о товарах, телефоне и адресе.
   * Проверяет заполненность всех обязательных полей перед отправкой.
   */
  const handleCheckout = () => {
    const normalizedPhone = phone.trim();
    const normalizedAddress = address.trim();
    if (normalizedPhone && normalizedAddress && agreement) {
      const orderItems = items
        .map(item => ({
          id: Number(item.productId),
          price: Number(item.price),
          count: Number(item.count),
        }))
        .filter(it => Number.isFinite(it.id) && Number.isFinite(it.price) && Number.isFinite(it.count) && it.count > 0);
      if (orderItems.length === 0) {
        return;
      }
      dispatch(sendOrderRequest({ phone: normalizedPhone, address: normalizedAddress, items: orderItems }));
    }
  };

  if (order.success) {
    return (
      <div className={styles.cart}>
        <h2>Заказ оформлен!</h2>
        <p>Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
        <button
          className={styles.checkoutButton}
          onClick={() => dispatch(resetOrder())}
        >
          Новый заказ
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.cartTitle}>Корзина</h2>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className={styles.itemsHeader}>
            <span className={styles.headerCell}>#</span>
            <span className={styles.headerCell}>Название</span>
            <span className={styles.headerCell}>Размер</span>
            <span className={styles.headerCell}>Кол-во</span>
            <span className={styles.headerCell}>Стоимость</span>
            <span className={styles.headerCell}>Итого</span>
            <span className={styles.headerCell}>Действия</span>
          </div>
          <ul className={styles.cartItems}>
            {items.map((item: CartItem, index: number) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <div className={styles.itemInfoRow}>
                    <span className={styles.colIndex}>{index + 1}</span>
                    <span className={styles.colTitle}>{item.title}</span>
                    <span className={styles.colSize}>{item.size}</span>
                    <span className={styles.colQuantity}>
                      <div className={styles.quantityControls}>
                        <button onClick={() => handleUpdateCount(item.id, item.count - 1)} disabled={item.count <= 1}>-</button>
                        <span>{item.count}</span>
                        <button onClick={() => handleUpdateCount(item.id, item.count + 1)}>+</button>
                      </div>
                    </span>
                    <span className={styles.colPrice}>{item.price} ₽</span>
                    <span className={styles.colTotal}>{item.price * item.count} ₽</span>
                    <span className={styles.colActions}>
                      <button className={styles.removeButton} onClick={() => handleRemove(item.id)}>Удалить</button>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.totalPrice}>Общая стоимость: {totalPrice} ₽</p>
          <button
            className={styles.checkoutButton}
            onClick={() => navigate('/catalog')}
            style={{ marginBottom: '20px', backgroundColor: '#6c757d' }}
          >
            Продолжить покупки
          </button>
          <div className={styles.orderForm}>
            <h3 className={styles.orderTitle}>Оформить заказ</h3>
            <div className={styles.orderCard}>
            <div className={styles.inputGroup}>
              <label>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                placeholder="Ваш телефон"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Адрес доставки</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.input}
                placeholder="Адрес доставки"
              />
            </div>
            <label className={styles.agreement}>
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              Согласен с правилами доставки
            </label>
            {order.error && <p className={styles.error}>{order.error}</p>}
            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={!phone.trim() || !address.trim() || !agreement || order.sending}
            >
              {order.sending ? 'Отправка...' : 'Оформить'}
            </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

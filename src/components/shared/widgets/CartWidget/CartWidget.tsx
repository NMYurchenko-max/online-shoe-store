import styles from './CartWidget.module.css';

interface CartWidgetProps {
  /** Количество товаров в корзине */
  count?: number;
}

/**
 * Виджет корзины покупок
 *
 * Отображает иконку корзины и количество товаров в ней (если больше 0)
 */
const CartWidget = ({ count = 0 }: CartWidgetProps) => {
  return (
    <div className={styles.cartContainer}>
      <button
        className={`${styles.headerControlsPic} ${styles.headerControlsCart}`}
        title="Корзина"
        aria-label="Корзина"
      />
      {count > 0 && (
        <span className={styles.headerControlsCartFull}>{count}</span>
      )}
    </div>
  );
};

export default CartWidget;

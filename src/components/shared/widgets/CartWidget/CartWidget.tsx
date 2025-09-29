import styles from './CartWidget.module.css';

interface CartWidgetProps {
  count?: number;
}

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

import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

/**
 * Компонент подвала приложения.
 * Содержит информацию о магазине, контакты, способы оплаты и социальные ссылки.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
        <div>
          <h3 className={styles.footerTitle}>Информация</h3>
          <Link to="/about" className={styles.footerLink}>О магазине</Link>
          <Link to="/catalog" className={styles.footerLink}>Каталог</Link>
          <Link to="/contacts" className={styles.footerLink}>Контакты</Link>
        </div>

        <div className={styles.footerPay}>
          <h3 className={styles.footerTitle}>Принимаем к оплате:</h3>
          <div className={styles.footerPaySystemsContainer}>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsPaypal}`}></span>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsMasterCard}`}></span>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsVisa}`}></span>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsYandex}`}></span>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsWebmoney}`}></span>
            <span className={`${styles.footerPaySystems} ${styles.footerPaySystemsQiwi}`}></span>
          </div>
          <p className={styles.footerCopyright}>
            2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
          </p>
          <p className={styles.footerCopyright}>
            Все права защищены.
          </p>
          <p className={styles.footerCopyright}>
            Доставка по всей России!
          </p>
        </div>

        <div className={styles.footerContacts}>
          <h3 className={styles.footerTitle}>Контакты</h3>
          <p className={styles.footerContact}>
            Телефон: <a href="tel:+74957903503" className={styles.footerContactLink}>+7(495)790-35-03</a> Ежедневно с 09-00 до 21-00
          </p>
          <p className={styles.footerContact}>
            Email: <a href="mailto:office@bosanoga.ru" className={styles.footerContactLink}>office@bosanoga.ru</a>
          </p>
          <div className={styles.footerSocialLinks}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${styles.footerSocialLink} ${styles.footerSocialLinkTwitter}`} aria-label="Twitter" title="Twitter"></a>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={`${styles.footerSocialLink} ${styles.footerSocialLinkVk}`} aria-label="VK" title="VK"></a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

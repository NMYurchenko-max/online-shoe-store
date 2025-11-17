import styles from './ContactsPage.module.css';

/**
 * Компонент страницы контактов.
 * Отображает адрес, телефон и email для связи с магазином.
 */
const ContactsPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.topSales}>
        <h2 className={styles.sectionTitle}>Контакты</h2>
        <p>Наш головной офис расположен в г.Москва, по адресу: Варшавское шоссе, д. 17, бизнес-центр W Plaza.</p>
        <h5 className={styles.subtitle}>Координаты для связи:</h5>
        <p>
          Телефон: <a href="tel:+7-495-790-35-03" className={styles.link}>+7 495 79 03 5 03</a> (ежедневно: с 09-00 до 21-00)
        </p>
        <p>
          Email: <a href="mailto:office@bosanoga.ru" className={styles.link}>office@bosanoga.ru</a>
        </p>
      </section>
    </div>
  );
};

export default ContactsPage;

import React from "react";
import styles from "./Preloader.module.css";

/**
 * Свойства компонента Preloader
 * @interface PreloaderProps
 * @property {boolean} show - Флаг отображения прелоадера
 */
interface PreloaderProps {
  show: boolean;
}

/**
 * Компонент Preloader отображает анимированный индикатор загрузки
 * @component
 * @param {PreloaderProps} props - Свойства компонента
 * @returns {JSX.Element | null} Элемент прелоадера или null, если show=false
 */
const Preloader: React.FC<PreloaderProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.preloader}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
};

export default Preloader;


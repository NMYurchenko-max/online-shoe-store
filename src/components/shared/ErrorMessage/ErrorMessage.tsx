import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

/**
 * Компонент отображения сообщения об ошибке
 * @param {ErrorMessageProps} props - Свойства компонента
 * @param {string} props.message - Текст сообщения об ошибке для отображения
 * @returns {JSX.Element} Элемент с сообщением об ошибке
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

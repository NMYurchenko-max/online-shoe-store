import { useState } from 'react';

/**
 * Пользовательский хук, который управляет состоянием в localStorage.
 *
 *@template T — Тип сохраненного значения.
 *Ключ @param {string} — ключ для сохранения значения в localStorage.
 *@param {T} InitialValue — начальное значение, которое будет использоваться, если в localStorage значение не найдено.
 *@returns {[T, (value: T | ((val: T) => T)) => void, () => void]} Массив, содержащий:
 *-Сохраненное значение
 *-Функция обновления сохраненного значения
 *-Функция удаления сохраненного значения
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  /**
   * Обновляет сохраненное значение как в состоянии, так и в localStorage.
   *
   * @param {T | ((val: T) => T)} value -
   *  Новое значение или функция, которая получает текущее значение и возвращает новое значение.
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  /**
   * Удаляет сохраненное значение как из localStorage, так и из состояния.
   */
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

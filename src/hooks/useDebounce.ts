import { useState, useEffect } from 'react';

/**
 * Хук для задержки обновления значения.
 * 
 * @param value - Значение, которое нужно задержать
 * @param delay - Задержка в миллисекундах
 * @returns Значение после задержки
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

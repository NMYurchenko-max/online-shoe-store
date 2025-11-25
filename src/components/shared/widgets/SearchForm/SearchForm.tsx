import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useDebounce } from '@/hooks/useDebounce';
import { setSearchQuery } from '@/redux/reducers/catalogSlice';
import styles from './SearchForm.module.css';

/**
 * Компонент формы поиска товаров
 * Позволяет пользователю вводить поисковый запрос, который дебаунсится и передается в Redux
 */
const SearchForm = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  /**
   * Обработчик изменения значения в поле ввода
   * @param e - событие изменения поля ввода
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className={styles.searchForm}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Поиск"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchForm;

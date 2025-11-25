import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setSearchQuery } from '@/redux/reducers/catalogSlice';
import styles from './SearchWidget.module.css';

/**
 * Компонент виджета поиска.
 * Позволяет пользователю вводить поисковый запрос и переходить к результатам поиска.
 * Управляет отображением поля ввода и обработкой поискового запроса.
 */
const SearchWidget = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.catalog.searchQuery);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  /**
   * Переключает видимость поля поиска.
   * Если поле открыто и введён текст, выполняет переход к результатам поиска.
   * В противном случае просто переключает видимость поля.
   */
  const toggleSearch = () => {
    if (showSearch && query.trim()) {
      // Если открыто и есть текст, перенаправить на catalog с q
      dispatch(setSearchQuery(query.trim()));
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      // Не очищаем query, чтобы при возврате поле оставалось заполненным
    } else {
      // Иначе toggle
      setShowSearch(!showSearch);
      if (!showSearch) {
        setTimeout(() => {
          const input = document.querySelector('input[type="search"]') as HTMLInputElement;
          if (input) input.focus();
        }, 0);
      }
    }
  };

  /**
   * Обрабатывает изменение значения в поле ввода.
   * @param e - Событие изменения значения поля ввода.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <button
        className={styles.headerControlsPic + ' ' + styles.headerControlsSearch}
        title="Поиск"
        aria-label="Поиск"
        onClick={toggleSearch}
      />
      <form className={`${styles.headerControlsSearchForm} ${showSearch ? '' : styles.invisible}`}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Поиск"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default SearchWidget;

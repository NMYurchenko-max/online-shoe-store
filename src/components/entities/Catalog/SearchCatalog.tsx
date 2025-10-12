import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/reducers/catalogSlice';
import { useDebounce } from '@/hooks/useDebounce';
import Categories from '@/components/shared/widgets/Categories';
import styles from './SearchCatalog.module.css';

const SearchCatalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchQuery = useAppSelector((state) => state.catalog.searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
    if (localSearch.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(localSearch.trim())}`, { replace: true });
    } else {
      navigate('/catalog', { replace: true });
    }
  };

  return (
    <div className={styles.searchCatalog}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Поиск"
          value={localSearch}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
      </form>
      <div className={styles.categoriesWrapper}>
        <Categories />
      </div>
    </div>
  );
};

export default SearchCatalog;

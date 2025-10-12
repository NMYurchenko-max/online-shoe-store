import Catalog from '@/components/entities/Catalog';
import SearchCatalog from '@/components/entities/Catalog/SearchCatalog';
import Preloader from '@/components/shared/Preloader';
import styles from './CatalogPage.module.css';
import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setSearchQuery } from '@/redux/reducers/catalogSlice';

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const categoriesLoading = useAppSelector((state) => state.categories.loading);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    dispatch(setSearchQuery(q));
  }, [searchParams, dispatch]);

  useEffect(() => {
    // Сбрасываем поиск при уходе со страницы каталога
    return () => {
      dispatch(setSearchQuery(''));
    };
  }, [location, dispatch]);

  return (
    <div className={styles.catalogPage}>
      <h1>Каталог товаров</h1>
      {categoriesLoading && <Preloader show={true} />}
      <div className={styles.filtersContainer}>
        <SearchCatalog />
      </div>
      <Catalog />
    </div>
  );
};

export default CatalogPage;

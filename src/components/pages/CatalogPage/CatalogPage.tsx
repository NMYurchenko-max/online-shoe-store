import Catalog from '@/components/entities/Catalog';
import SearchCatalog from '@/components/entities/Catalog/SearchCatalog';
import Preloader from '@/components/shared/Preloader';
import styles from './CatalogPage.module.css';
import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setSearchQuery } from '@/redux/reducers/catalogSlice';

/**
 * Компонент страницы каталога товаров.
 * Управляет поиском через URL параметры и отображает фильтры и каталог.
 *
 * @component
 * @example
 * return (
 *   <CatalogPage />
 * )
 */
const CatalogPage = () => {
  /** Хук для получения параметров поиска из URL */
  const [searchParams] = useSearchParams();
  /** Хук для получения информации о текущем местоположении */
  const location = useLocation();
  /** Диспетчер Redux для отправки действий */
  const dispatch = useAppDispatch();
  /** Состояние загрузки категорий товаров */
  const categoriesLoading = useAppSelector((state) => state.categories.loading);

  /**
   * Эффект для обновления запроса поиска при изменении параметров URL
   * Получает значение параметра 'q' из URL и устанавливает его в состояние поиска
   */
  useEffect(() => {
    const q = searchParams.get('q') || '';
    dispatch(setSearchQuery(q));
  }, [searchParams, dispatch]);

  /**
   * Эффект для сброса поиска при уходе со страницы каталога
   * Очищает состояние поиска при размонтировании компонента
   */
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

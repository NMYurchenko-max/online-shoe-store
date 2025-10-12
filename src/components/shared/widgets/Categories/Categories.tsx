import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCategoryId } from '@/redux/reducers/catalogSlice';
import { fetchCategoriesStart } from '@/redux/reducers/categoriesSlice';
import type { Category } from '@/models/type';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Preloader from '@/components/shared/Preloader';
import styles from './Categories.module.css';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: categories, loading, error } = useAppSelector((state) => state.categories);
  const selectedCategoryId = useAppSelector((state) => state.catalog.categoryId);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  const handleCategoryClick = (id: number) => {
    dispatch(setCategoryId(id));
  };

  if (loading) return <Preloader show={true} />;
  if (error) return <ErrorMessage message={error} />;

  // Добавляем элемент "Все" в начало массива категорий
  const categoriesWithAll = [{ id: 0, title: 'Все' }, ...categories];

  return (
    <ul className={styles.categoriesContainer} aria-label="Фильтры каталога">
      {categoriesWithAll.length > 0 ? (
        categoriesWithAll.map((category: Category | { id: number; title: string }) => (
          <li
            key={category.id}
            className={`${styles.categoryText} ${selectedCategoryId === category.id ? `${styles.categoryTextSelected} ${category.id === 0 ? styles.categoryTextAll : ''}` : ''}`}
            onClick={() => handleCategoryClick(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCategoryClick(category.id); }}
          >
            {category.title}
          </li>
        ))
      ) : (
        <li>Фильтры не найдены</li>
      )}
    </ul>
  );
};

export default Categories;

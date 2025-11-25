import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCategoryId } from '@/redux/reducers/catalogSlice';
import { fetchCategoriesStart } from '@/redux/reducers/categoriesSlice';
import type { Category } from '@/models/type';
import ErrorMessage from '@/components/shared/ErrorMessage';
import styles from './Categories.module.css';

/**
 * Компонент Categories отображает список категорий товаров.
 *
 * Компонент загружает список категорий из Redux store при монтировании.
 * Позволяет пользователю выбирать категорию для фильтрации товаров в каталоге.
 * Всегда отображает категорию "Все" в начале списка для сброса фильтра.
 */
const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: categories, error } = useAppSelector((state) => state.categories);
  const selectedCategoryId = useAppSelector((state) => state.catalog.categoryId);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  /**
   * Обработчик клика по категории.
   *
   * @param id - Идентификатор выбранной категории
   */
  const handleCategoryClick = (id: number) => {
    dispatch(setCategoryId(id));
  };

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

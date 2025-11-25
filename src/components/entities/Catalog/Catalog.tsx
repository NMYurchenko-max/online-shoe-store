import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchCatalogStart } from '@/redux/reducers/catalogSlice';
import type { Item } from '@/models/type';
import ErrorMessage from '@/components/shared/ErrorMessage';
import catalogStyles from './Catalog.module.css';

/**
 * Компонент каталога товаров обуви
 *
 * Отображает список товаров с возможностью загрузки дополнительных элементов.
 * Обрабатывает фильтрацию по категории и поисковому запросу.
 * При клике на товар переходит на страницу деталей продукта.
 */
const Catalog = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading, error, hasMore, categoryId, searchQuery } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    // При изменении categoryId или searchQuery сбрасываем offset в 0
    if (categoryId > 0 && searchQuery) {
      dispatch(fetchCatalogStart({ categoryId, q: searchQuery, offset: 0 }));
    } else if (categoryId > 0) {
      dispatch(fetchCatalogStart({ categoryId, offset: 0 }));
    } else if (searchQuery) {
      dispatch(fetchCatalogStart({ q: searchQuery, offset: 0 }));
    } else {
      dispatch(fetchCatalogStart({ offset: 0 }));
    }
  }, [dispatch, categoryId, searchQuery]);

  /**
   * Загружает дополнительные товары при прокрутке
   *
   * Проверяет наличие дополнительных товаров и отсутствие активной загрузки,
   * затем отправляет запрос на сервер с новым смещением.
   */
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const newOffset = items.length;
      dispatch(fetchCatalogStart({ offset: newOffset }));
    }
  };

  /**
   * Переходит на страницу товара
   *
   * @param item - Объект товара для отображения
   */
  const handleOrder = (item: Item) => {
    navigate(`/product/${item.id}`);
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={catalogStyles.catalog}>
      <div className={catalogStyles.items}>
        {items.map((item: Item) => (
          <div key={item.id} className={catalogStyles.item}>
            <div className={catalogStyles.imageWrapper}>
              <img src={item.images[0]} alt={item.title} className={catalogStyles.image} />
            </div>
            <div className={catalogStyles.descriptionWrapper}>
              <p className={catalogStyles.title}>{item.title}</p>
              <p className={catalogStyles.price}>{item.price} ₽</p>
              <button className={catalogStyles.orderButton} onClick={() => handleOrder(item)}>
                Заказать
              </button>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className={catalogStyles.loadMore} onClick={handleLoadMore} disabled={loading}>
          Загрузить ещё
        </button>
      )}
    </div>
  );
};

export default Catalog;

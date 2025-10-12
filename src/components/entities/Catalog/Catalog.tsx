import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchCatalogStart } from '@/redux/reducers/catalogSlice';
import type { Item } from '@/models/type';
import Preloader from '@/components/shared/Preloader';
import ErrorMessage from '@/components/shared/ErrorMessage';
import catalogStyles from './Catalog.module.css';

const Catalog = () => {
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

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const newOffset = items.length;
      dispatch(fetchCatalogStart({ offset: newOffset }));
    }
  };

  const handleOrder = (item: unknown) => {
    // TODO: добавить в корзину
    console.log('Order item:', item);
  };

  if (loading && items.length === 0) return <Preloader show={true} />;
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
        <>
          <button className={catalogStyles.loadMore} onClick={handleLoadMore} disabled={loading}>
            Загрузить ещё
          </button>
          {loading && <Preloader show={true} />}
        </>
      )}
    </div>
  );
};

export default Catalog;

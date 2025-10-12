# Уточненный план действий для дипломного проекта "Онлайн-магазин обуви"

## Общее понимание задачи
Проект представляет собой полнофункциональный онлайн-магазин обуви на React с TypeScript, Redux Toolkit и Redux-Saga. На основе анализа файлов проекта (README-TASK.md, Description.md, структура src/), установлено, что реализованы:
- Этап 1: Подготовка, статические страницы, роутинг, базовая структура.
- Этап 2: HTTP-запросы, каталог, топ-продажи, поиск и фильтрация (с исправлениями проблем).
- Осталось реализовать Этап 3: Корзина, страница товара, оформление заказа, loader'ы, обработка ошибок, тестирование.

## Текущий статус реализации
- **Redux**: Настроен store, slices для topSales, categories, catalog; sagas для соответствующих запросов.
- **Компоненты**: Header, Footer, Banner, TopSales, Catalog, SearchWidget, Categories, ProductCard, Preloader, ErrorMessage, статические страницы.
- **API**: apiService настроен.
- **Cart**: cartService для localStorage.
- **Hooks**: useAppDispatch, useAppSelector, useDebounce, useLocalStorage.
- **Проблемы**: Исправлены линтерные предупреждения, фильтрация и пагинация.

## Детальный план оставшихся задач

### Этап 3: Корзина, заказ и страница товара
1. **Item Slice и Saga** (для страницы товара):
   - Создать itemSlice.ts: состояния для загрузки товара по ID.
   - Создать itemSaga.ts: GET /api/items/:id с loader и error handling.
   - Файлы: src/redux/reducers/itemSlice.ts, src/redux/sagas/itemSaga.ts, обновить rootSaga.ts и reducers/index.ts.

2. **ProductPage**:
   - Реализовать ProductPage.tsx: загрузка товара, отображение изображений, размеров, количества.
   - Логика выбора размера, добавления в корзину (dispatch addToCart).
   - Стили: ProductPage.module.css.
   - Файлы: src/components/pages/ProductPage/ProductPage.tsx, ProductPage.module.css.

3. **Cart Slice и Saga**:
   - Создать cartSlice.ts: addToCart, removeFromCart, clearCart, состояния items, total.
   - Создать cartSaga.ts: сохранение в localStorage при изменениях.
   - Файлы: src/redux/reducers/cartSlice.ts, src/redux/sagas/cartSaga.ts, обновить rootSaga.ts и reducers/index.ts.

4. **Cart Entity**:
   - Создать Cart.tsx: отображение товаров в корзине, удаление, расчет суммы.
   - Файлы: src/components/entities/Cart/Cart.tsx, Cart.module.css, index.ts.

5. **CartPage**:
   - Реализовать CartPage.tsx: интеграция Cart entity, форма заказа (телефон, адрес).
   - Dispatch submitOrder при отправке формы.
   - Стили: CartPage.module.css.
   - Файлы: src/components/pages/CartPage/CartPage.tsx, CartPage.module.css.

6. **Order Slice и Saga**:
   - Создать orderSlice.ts: submitOrder, состояния loading, success, error.
   - Создать orderSaga.ts: POST /api/order, очистка корзины при успехе.
   - Файлы: src/redux/reducers/orderSlice.ts, src/redux/sagas/orderSaga.ts, обновить rootSaga.ts и reducers/index.ts.

### Этап 4: Loader'ы и обработка ошибок
1. **Интеграция Preloader**:
   - Добавить Preloader в компоненты с загрузкой: TopSales, Catalog, ProductPage, CartPage, CatalogPage.
   - Использовать состояния loading из slices.

2. **Интеграция ErrorMessage**:
   - Добавить ErrorMessage для ошибок API.
   - Добавить retry логику в sagas (takeLatest с retry).

3. **Обновить sagas**:
   - Добавить error handling и pending/success в slices.
   - Обработка 404 для товара (опционально).

### Этап 5: Тестирование и финализация
1. **Cypress E2E тесты**:
   - Создать тесты: main-page.cy.ts (проверка загрузки, навигации), catalog-page.cy.ts (поиск, фильтрация, пагинация), product-page.cy.ts (загрузка товара, добавление в корзину), cart-page.cy.ts (корзина, заказ).
   - Файлы: cypress/integration/*.cy.ts.

2. **Тестирование функционала**:
   - Запустить dev сервер, проверить все страницы, формы, API.
   - Проверить loader'ы, ошибки, localStorage.

3. **Деплой**:
   - Настроить gh-pages: yarn build, push to GitHub.
   - Проверить production на https://username.github.io/online-shoe-store/.

4. **Финальные проверки**:
   - Линтер: yarn lint.
   - Типы: все any заменены.
   - Доступность: aria-label, title.
   - Совпадение с дизайном из HTML.

## Зависимые файлы для редактирования/создания
- Новые: src/redux/reducers/itemSlice.ts, cartSlice.ts, orderSlice.ts; src/redux/sagas/itemSaga.ts, cartSaga.ts, orderSaga.ts; src/components/entities/Cart/; обновить src/components/pages/ProductPage/, CartPage/.
- Существующие: rootSaga.ts, reducers/index.ts, компоненты для интеграции loader/error.

## Следующие шаги после реализации
1. Реализовать по этапам, тестируя каждый.
2. После каждого этапа: yarn build, проверить ошибки.
3. Финальное тестирование: полный цикл от поиска до заказа.
4. Деплой и публикация на GitHub.

Пожалуйста, подтвердите, можно ли приступать к реализации этого плана?

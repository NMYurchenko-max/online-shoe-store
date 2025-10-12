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

### Этап 3: Корзина, заказ и страница товара (текущий)
1. **Item Slice и Saga**:
   - Создать itemSlice.ts, itemSaga.ts; обновить reducers/index.ts, rootSaga.ts.

2. **ProductPage**:
   - Реализовать ProductPage.tsx, ProductPage.module.css; добавить маршрут /product/:id в AppRoutes.tsx.

3. **Cart Slice и Saga**:
   - Создать cartSlice.ts, cartSaga.ts; обновить reducers/index.ts, rootSaga.ts.

4. **Cart Entity**:
   - Создать Cart.tsx, Cart.module.css.

5. **CartPage**:
   - Реализовать CartPage.tsx, CartPage.module.css; добавить маршрут /cart в AppRoutes.tsx.

6. **Order Slice и Saga**:
   - Создать orderSlice.ts, orderSaga.ts; обновить reducers/index.ts, rootSaga.ts.

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

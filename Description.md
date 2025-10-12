# Описание реализации онлайн-магазина обуви

## Общая структура проекта frontend (Vite + React + TypeScript)

Backend: реализован, менять нельзя
[Backend for 'Online shoe store'](https://github.com/NMYurchenko-max/backend-online-shoe-store)

Опубликован для работы с GitHub Actions на Render.
[Backend-Render](https://backend-online-shoe-store.onrender.com)


1. Глобально выстроить правильную структуру для реализации функциональности приложения.
2. Все компоненты имеют комплект файлов: *.tsx, *.module.css, index.ts
3. Используем generic -widgets для формирования компонентов с разнообразными типами.
4. Стилизация вёрстки с использованием CSS и Bootstrap 5 (как в постановке задания), в проект временно поместила файл styles.css в папку src, чтобы соблюсти заказанные стили - отсюда беру код для стилизации компонентов. Сочетание: CSS modules для компонентных стилей (ProductPage.module.css, Cart.module.css), Bootstrap/React-Bootstrap для глобальных стилей и UI-компонентов (Container, Row, Col, Button, Form). Импорт Bootstrap CSS в main.tsx или index.css для глобальных стилей.
5. html разметка для использования в создании компонентов - дана в описании диплотной задачи.

```plantext
online-shoe-store/
├── src/
│   ├── components/
│   │   ├── entities/          # Бизнес-сущности (TopSales, Catalog, Cart)
│   │   │   ├── TopSales/
│   │   │   │   ├── TopSales.tsx
│   │   │   │   ├── TopSales.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Catalog/
│   │   │   ├── Cart/
│   │   │   ├── ProductCard/    # Generic компонент для карточки товара
│   │   │   └── Banner/         # Рекламный баннер
│   │   ├── pages/              # Страницы приложения
│   │   │   ├── MainPage/
│   │   │   ├── CatalogPage/
│   │   │   ├── ProductPage/
│   │   │   ├── CartPage/
│   │   │   ├── AboutPage/
│   │   │   ├── ContactsPage/
│   │   │   └── NotFoundPage/
│   │   ├── layouts/            # Макеты (Header, Footer)
│   │   │   ├── Header/
│   │   │   └── Footer/
│   │   └── shared/             # Переиспользуемые компоненты
│   │       ├── utils/          # Вспомогательные функции (debounce, formatters)
│   │       ├── widgets/        # Виджеты (SearchWidget, CartWidget)
│   │       │   ├── SearchWidget/
│   │       │   └── CartWidget/
│   │       └── ui/             # UI компоненты (Preloader, ErrorMessage)
│   │           ├── Preloader/
│   │           ├── ErrorMessage/
|   |
│   ├── models/                 # Модели данных и типы
│   │   ├── type.ts             # TypeScript интерфейсы (Item, Category, etc.)
│   │   └── react-node.d.ts     # Типы для React
│   ├── redux/                  # Глобальное состояние (Redux Toolkit + Saga)
│   │   ├── actions/            # Action creators
│   │   │   ├── topSalesActions.ts
│   │   │   ├── categoriesActions.
│   │   │   ├── catalogActions.ts
│   │   │   ├── itemActions.ts
│   │   │   ├── cartActions.ts
│   │   │   └── orderActions.ts
│   │   ├── reducers/           # Reducers (createSlice)
│   │   │   ├── topSalesSlice.ts
│   │   │   ├── categoriesSlice.ts
│   │   │   ├── catalogSlice.ts
│   │   │   ├── itemSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── orderSlice.ts
│   │   ├── sagas/              # Sagas для асинхронных операций
│   │   │   ├── topSalesSaga.ts
│   │   │   ├── categoriesSaga.ts
│   │   │   ├── catalogSaga.ts
│   │   │   ├── itemSaga.ts
│   │   │   ├── cartSaga.ts
│   │   │   ├── orderSaga.ts
│   │   │   └── rootSaga.ts
│   │   └── store/              # Настройка store
│   │       └── index.ts
│   ├── routes/                 # Маршрутизация
│   │   └── AppRoutes.tsx       # Определение маршрутов
│   ├── hooks/                  # Кастомные хуки
│   │   ├── useAppDispatch.ts   # Typed dispatch
│   │   ├── useAppSelector.ts   # Typed selector
│   │   ├── useDebounce.ts      # Debounce для поиска
│   │   └── useLocalStorage.ts  # Хук для localStorage
│   ├── services/               # Сервисы для работы с данными
│   │   ├── api/                # API сервис (Axios)
│   │   │   └── apiService.ts
│   │   └── cart/               # Сервис корзины (localStorage)
│   │       └── cartService.ts
│   ├── main.tsx               # Точка входа
│   ├── App.tsx                 # Корневой компонент
|   ├── App.css
│   ├── index.css                 # Глобальные стили
│   └── style.css               # Стили из HTML (временно, для кастомизации)
├── .env                        # Переменные окружения (API URL)
├── images.d.ts
├── public/                     # Статические файлы
│   ├── favicon.ico              # Фavicon
|   ├── images/                # Изображения
│   │   ├── banner.jpg            # Баннер
│   │   ├── products/           # Изображения товаров
│   │   ├── footer-sprite.png       # Иконка социальных сетей, карточек
│   │   ├── header-controls-sprite.png       # Иконка поиска, корзины, человека
│   │   ├── header-logo.png             # логоти
├── vite.config.ts              # Конфигурация Vite (aliases, plugins,...)
├── tsconfig.json               # TypeScript конфиг
├── cypress/                    # E2E тесты
│   ├── integration/
│   │   ├── main-page.cy.ts
│   │   ├── catalog-page.cy.ts
│   │   ├── product-page.cy.ts
│   │   └── cart-page.cy.ts
│   └── support/
│       └── commands.ts
└── package.json      # Зависимости (React, Redux Toolkit, react-bootstrap (при необходимости), Cypress)
```
**Придерживаться правилам-критериям оценки:**

## Переменные окружения, API URL, vite.config.ts

.env
```
VITE_API_BASE_URL=https://backend-online-shoe-store.onrender.com
```
ApiService.ts:
```ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
```
vite.config.ts:
```ts
...
  base: mode === 'production' ? '/online-shoe-store/' : '/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:7070',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
```

## Кастомные хуки

- **useAppDispatch**: Typed версия useDispatch для Redux.
- **useAppSelector**: Typed версия useSelector для Redux.
- **useDebounce**: Хук для debounce поиска (delay 300ms).
- **useLocalStorage**: Хук для работы с localStorage (get/set/remove).

## Настройка vite.config.ts  - сделано

## Поэтапная реализация

### Этап 1: Подготовка (выполнено)
1. [x] Установить зависимости.
2. [x] Настроить .env, vite.config.ts.
3. [x] Создать базовую структуру папок.
4. [x] Определить типы в models/type.ts.
5. [x] Создать сервисы (apiService, cartService).
6. [x] Настроить Redux store с Toolkit и Saga.
7. [x] Создать кастомные хуки (useAppDispatch, useAppSelector, useDebounce, useLocalStorage).
8. [x] Создать базовые компоненты (App, main, routes, статические страницы).
9. [x] Запустить dev сервер и проверить сборку.

**Статические страницы завершены:** 
Header с навигацией, логотипом (/img/header-logo.png, отображается), 
SearchWidget, CartWidget (спрайт /img/header-controls-sprite.png с индикатором), 

Баннером (background /img/banner.jpg с overlay). 
с надписью "К весне готовы!"

Footer с меню (Link to для роутинга), спрайтами (/img/footer-sprite.png):

блок оплаты - иконки карточек,
текст copyright в отдельных строках 
("2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.", 
"Все права защищены.", "Доставка по всей России!");

блок контакты -
(телефон tel:+74957903503, email mailto:office@bosanoga.ru, 
социальные ссылки на Twitter/VK с target="_blank", aria-label и title для доступности). 

блок информации - кликабельные ссылки с переходом на страницы
Страницы About, Contacts, 404 с полным контентом из HTML, 
стили в .module.css на основе src/style.css (центрирование, цвета, hover). 
Layout в App.tsx. 

Preloader сделан, пока не подключен. 

Изображения в public/img/, пути /img/ работают.
 
vite.config.ts с conditional base для dev/prod. 
Роутинг с basename для gh-pages. 

Все ссылки кликабельны, навигация работает без пустых экранов, 
доступность (title/aria-label для иконок). 

Переходим к Этапу 2 (HTTP, каталог, топ продаж).

### Этап 2: HTTP и каталог
1. Реализовать sagas для API запросов (topSales, categories, catalog).
2. Создать entities: TopSales, Catalog с generic ProductCard.
3. Добавить поиск (SearchWidget с debounce).
4. Интегрировать на MainPage и CatalogPage.


---

### Решение проблемы с отображением поиска в каталоге

Проблема заключалась в том, что при изменении параметров фильтрации (searchQuery, categoryId) не всегда корректно сбрасывался offset и не очищался список товаров, что приводило к неправильному отображению результатов.
- При изменении фильтров (searchQuery, categoryId) необходимо сбрасывать offset в 0 и очищать список товаров, чтобы не смешивать старые и новые данные.
- Логика пагинации должна учитывать текущие фильтры и корректно подгружать следующие товары.
- В Redux-слайсе catalogSlice добавить обработку сброса offset и очистки items при изменении фильтров.
- Тестировать отображение товаров, работу поиска и пагинации.
- Обеспечить корректное обновление состояния при переходах между страницами и изменении параметров.


Решение:
- В catalogSlice.ts при изменении searchQuery или categoryId происходит сброс offset в 0 и очистка items.
- В компоненте Catalog.tsx добавлена логика, которая при изменении фильтров проверяет offset и при необходимости сбрасывает его в 0, чтобы инициировать загрузку новых данных с начала.
- Это позволило корректно отображать результаты поиска и фильтрации на странице каталога.

Сделано!

### Проблема с фильтрацией по категориям и пагинацией

Проблема:
- При смене категории происходит смешивание товаров из разных категорий, так как список товаров не очищается должным образом или offset не сбрасывается.
- Кнопка "Загрузить ещё" не работала, так как loadMore увеличивал offset, но не вызывал загрузку.

Методы исправления:
- В catalogSlice.ts оставили сброс offset и items в setCategoryId и setSearchQuery при изменении фильтров.
- Убрали сброс из fetchCatalogStart, чтобы избежать двойного сброса.
- В catalogSaga.ts добавили takeEvery(loadMore.type, fetchCatalog), чтобы при loadMore вызывалась загрузка с новым offset.
- Это обеспечило корректный сброс при изменении фильтров и загрузку при пагинации.

Результат:
- Фильтрация по категориям и поиск работают корректно, товары не смешиваются при предварительном выборе конкретного товара. Напимер: поиск Кеды отработал, выбираем по фильртуру - работает уточнение - детские.
Фильтры без предварительного выбора товара прродолжаею смешивать категории...
- Пагинация работает, кнопка "Загрузить ещё" подгружает следующие товары.
- Функциональность и визуализация не пострадали.

---

### Исправление линтерных предупреждений

Проблема:
- В коде присутствовали предупреждения линтера @typescript-eslint/no-explicit-any в нескольких файлах, что снижало типобезопасность и могло привести к ошибкам.

Методы исправления:
- Заменили использование типа `any` на корректные типы из `models/type.ts` (Item, Category, RootState).
- В `src/components/entities/Catalog/Catalog.tsx`: убрали `(state: unknown) => (state as any).catalog`, использовали `(state) => state.catalog`.
- В `src/components/entities/Catalog/SearchCatalog.tsx`: убрали `(state: any)`, использовали `(state) => state.catalog.searchQuery`.
- В `src/components/entities/TopSales/TopSales.tsx`: заменили `(item: any)` на `(item: Item)`, добавили импорт типа.
- В `src/components/shared/widgets/Categories/Categories.tsx`: убрали `(state: any)` два раза, использовали `(state) => state.categories` и `(state) => state.catalog.categoryId`; заменили `(category: any)` на `(category: Category | { id: number; title: string })`, добавили импорт типа.
- В `src/hooks/useAppSelector.ts`: исправили типизацию на `TypedUseSelectorHook<RootState>`, добавили импорт типа.

Результат:
- Все предупреждения линтера устранены, код прошел проверку `yarn lint` без ошибок.
- Повышена типобезопасность, улучшена поддерживаемость кода.
- Функциональность и визуализация не пострадали.

---

### Этап 3: Корзина и заказ
1. Добавить cart/order slices и sagas.
2. Создать Cart entity и CartPage.
3. Реализовать ProductPage с выбором размера/количества.
4. Добавить loader'ы и обработку ошибок (Preloader, ErrorMessage).
5. Настроить Cypress тесты.

### Особенности реализации
- **Generics**: ProductCard как generic для списков товаров.
- **Стили**: CSS modules + bootstrap, react-bootstrap.
- **Redux**: Redux Toolkit + Saga.
- **Обработка ошибок**: Retry в sagas, ErrorBoundary.
- **Loader'ы**: Preloader  + custom overlay.
- **Тестирование**: Cypress для E2E, проверка роутинга, форм, API.
- **Деплой**: gh-pages с Vite build.

## Текущий прогресс 
- **Этапы 1-2 выполнены**: Базовая структура, роутинг, статические страницы, HTTP-запросы, каталог, топ-продажи, поиск и фильтрация (с исправлениями проблем: линтер, пагинация, фильтрация по категориям).
- **Визуализация загрузки**: Preloader интегрирован частично в MainPage (для catalog.loading), CatalogPage (для categories.loading), TopSales (для topSales.loading); дублирующие preloaders удалены из Catalog; сообщение "Загрузка фильтров..." убрано из Categories; категории отцентрированы.
- **Обработка ошибок**: ErrorMessage добавлен частично в Catalog, Categories, TopSales.
- **Сборка**: Без ошибок, yarn lint проходит успешно.
- **Проблемы исправлены**: Линтерные предупреждения, смешивание товаров при фильтрации, пагинация, позиционирование preloader'ов.
- **Деплой**: Готов опубликован в состоянии реализации 1-2 этапов.

Переходим к Этапу 3: Корзина, заказ и страница товара.

### Детальный план Этапа 3
1. **Item Slice и Saga** (для страницы товара):
   - Создать itemSlice.ts: состояния для загрузки товара по ID (item, loading, error).
   - Создать itemSaga.ts: GET /api/items/:id с loader и error handling (takeLatest(fetchItemStart, fetchItem)).
   - Обновить reducers/index.ts: добавить itemReducer в rootReducer.
   - Обновить sagas/rootSaga.ts: добавить itemSaga() в all[].
   - Файлы: src/redux/reducers/itemSlice.ts, src/redux/sagas/itemSaga.ts.

2. **ProductPage**:
   - Реализовать ProductPage.tsx: useEffect для dispatch(fetchItemStart(id)) из URL params; отображение item (изображения, title, price, sizes, description); выбор размера (dropdown), количества (input); кнопка "Добавить в корзину" (dispatch addToCart, но cart slice пока не создан - stub).
   - Интеграция Preloader (если item.loading), ErrorMessage (если item.error).
   - Стили: ProductPage.module.css (на основе style.css: grid для изображений/описания, flex для выбора размера/количества).
   - Файлы: src/components/pages/ProductPage/ProductPage.tsx, ProductPage.module.css, index.ts (export default ProductPage).

3. **Cart Slice и Saga**:
   - Создать cartSlice.ts: initialState { items: [], total: 0 }; actions: addToCart (PayloadAction<{id, size, quantity}>), removeFromCart (PayloadAction<number>), clearCart, updateTotal.
   - Создать cartSaga.ts: watch для add/remove/clear, side-effects: saveToLocalStorage (используя cartService).
   - Обновить reducers/index.ts и rootSaga.ts аналогично item.
   - Файлы: src/redux/reducers/cartSlice.ts, src/redux/sagas/cartSaga.ts.

4. **Cart Entity**:
   - Создать Cart.tsx: отображение items (ProductCard или custom list с изображением, title, size, quantity, price, remove button); расчет total; кнопка "Оформить заказ".
   - Стили: Cart.module.css (table-like layout, responsive).
   - Файлы: src/components/entities/Cart/Cart.tsx, Cart.module.css, index.ts.

5. **CartPage**:
   - Реализовать CartPage.tsx: <Cart />; форма заказа (input phone, address); кнопка submit (dispatch submitOrder с cart.items + form data).
   - Preloader для order.loading, ErrorMessage для order.error.
   - Стили: CartPage.module.css (form styling).
   - Файлы: src/components/pages/CartPage/CartPage.tsx, CartPage.module.css.

6. **Order Slice и Saga**:
   - Создать orderSlice.ts: initialState { loading: false, success: false, error: null }; actions: submitOrderStart (PayloadAction<OrderData>), submitOrderSuccess, submitOrderFailure.
   - Создать orderSaga.ts: POST /api/order, при успехе: clearCart, set success true; error handling.
   - Обновить reducers/index.ts и rootSaga.ts.
   - Файлы: src/redux/reducers/orderSlice.ts, src/redux/sagas/orderSaga.ts.

### Зависимые файлы
- Новые: itemSlice.ts, itemSaga.ts, cartSlice.ts, cartSaga.ts, orderSlice.ts, orderSaga.ts, ProductPage/*, Cart/*, CartPage/*.
- Обновляемые: reducers/index.ts (добавить reducers), sagas/rootSaga.ts (добавить sagas), routes/AppRoutes.tsx (добавить /product/:id -> ProductPage, /cart -> CartPage).

### Следующие шаги после Этапа 3
- Интеграция Preloader/ErrorMessage в новые компоненты (ProductPage, CartPage).
- Тестирование: yarn dev, проверить загрузку товара, добавление/удаление в корзину, submit order.
- yarn build, lint.
- Перейти к Этапу 4 (дополнительные loader'ы, retry, error handling).

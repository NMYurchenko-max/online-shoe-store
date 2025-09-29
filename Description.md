# Описание реализации онлайн-магазина обуви

## Общая структура проекта frontend (Vite + React + TypeScript)

Backend: реализован, менять нельзя
[Backend for 'Online shoe store'](https://github.com/NMYurchenko-max/backend-online-shoe-store)

Опубликован для работы с GitHub Actions на Render.
[Backend-Render](https://backend-online-shoe-store.onrender.com)


1. Глобально выстроить правильную структуру для реализации функциональности приложения.
2. Все компоненты имеют комплект файлов: *.tsx, *.module.css, index.ts
3. Используем generic -widgets для формирования компонентов с разнообразными типами.
4. Стилизация вёрстки с использованием CSS и  Botsrat.5. (как в постановке задания), в  проект временно поместила файл  styles.css в папку src, чтобы соблюсти  заказанные стили - отсюда беру код для стилизации компонентов
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
 base: process.env.NODE_ENV === 'production' ? '/online-shoe-store/' : '/',
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
Сборка без обшибок. Публикую 1-й этап, отправляю на проверку.

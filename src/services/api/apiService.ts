import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Item, Category, Order } from '@/models/type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Экземпляр Axios с базовой конфигурацией.
 */
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

/**
 * Сервис для работы с API.
 * Содержит методы для получения данных о товарах, категориях, заказах.
 */
export const apiService = {
  /**
   * Получает список хитов продаж.
   * @returns Массив товаров-хитов продаж.
   */
  getTopSales: async (): Promise<Item[]> => {
    const response = await api.get('/api/top-sales');
    return response.data;
  },

  /**
   * Получает список категорий товаров.
   * @returns Массив категорий.
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/api/categories');
    return response.data;
  },

  /**
   * Получает список товаров с возможными фильтрами.
   * @param params - Параметры фильтрации (категория, поисковый запрос, смещение).
   * @returns Массив товаров.
   */
  getItems: async (params?: {
    categoryId?: number;
    q?: string;
    offset?: number;
  }): Promise<Item[]> => {
    const response = await api.get('/api/items', { params });
    return response.data;
  },

  /**
   * Получает детальную информацию о товаре по ID.
   * @param id - ID товара.
   * @returns Объект товара.
   */
  getItem: async (id: number): Promise<Item> => {
    const response = await api.get(`/api/items/${id}`);
    return response.data;
  },

  /**
   * Отправляет заказ на сервер.
   * @param order - Объект заказа.
   */
  postOrder: async (order: Order): Promise<void> => {
    await api.post('/api/order', order);
  },
};

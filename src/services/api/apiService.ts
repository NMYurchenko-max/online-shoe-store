import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Item, Category, Order } from '@/models/type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const apiService = {
  getTopSales: async (): Promise<Item[]> => {
    const response = await api.get('/top-sales');
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  getItems: async (params?: {
    categoryId?: number;
    q?: string;
    offset?: number;
  }): Promise<Item[]> => {
    const response = await api.get('/items', { params });
    return response.data;
  },

  getItem: async (id: number): Promise<Item> => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  postOrder: async (order: Order): Promise<void> => {
    await api.post('/order', order);
  },
};

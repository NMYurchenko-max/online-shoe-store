import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

/**
 * Типизированный хук useDispatch для использования с AppDispatch
 *
 * @returns {AppDispatch} Типизированный dispatch функции из redux store
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

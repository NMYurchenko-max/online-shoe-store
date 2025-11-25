import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/redux/reducers';

/**
 * Типизированный хук useSelector для использования с RootState
 * Позволяет использовать селекторы с автоматической типизацией состояния
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import { RootState, AppDispatch, AppThunk } from './types';

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
const useDispatch: () => AppDispatch | AppThunk = dispatchHook;

export { useSelector, useDispatch };
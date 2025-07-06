import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import authReducer from './slices/authSlice';
import constructorBurgerReducer from './slices/constructorSlice';
import feedsReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  constructorBurger: constructorBurgerReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

import { rootReducer } from './store';
import { initialState as authInitialState } from './slices/authSlice';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as ordersInitialState } from './slices/orderSlice';
import { initialState as feedsInitialState } from './slices/feedSlice';
import { initialState as constructorInitialState } from './slices/constructorSlice';

const expectedInitialState = {
  auth: authInitialState,
  ingredients: ingredientsInitialState,
  orders: ordersInitialState,
  feeds: feedsInitialState,
  constructorBurger: constructorInitialState
};

describe('Тестирование rootReducer', () => {
  it('Должен возвращать начальное состояние для неизвестного экшена', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(expectedInitialState);
  });
});

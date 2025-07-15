import { describe, expect } from '@jest/globals';
import ordersReducer, {
  initialState,
  createOrder,
  fetchOrders,
  fetchOrderByNumber,
  clearCurrentOrder
} from './orderSlice';

const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Order 1',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 123,
  ingredients: []
};

const mockOrders = [mockOrder];

describe('ordersSlice reducer', () => {
  test('Тест clearCurrentOrder', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrder: mockOrder
    };
    const state = ordersReducer(stateWithOrder, clearCurrentOrder());
    expect(state.currentOrder).toBeNull();
  });
});

test('Должен обрабатывать createOrder.pending', () => {
  const state = ordersReducer(initialState, createOrder.pending('pending', []));
  expect(state).toEqual({
    ...initialState,
    isLoading: true
  });
});

test('Должен обрабатывать createOrder.fulfilled', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const apiResponse = {
    success: true,
    order: mockOrder,
    name: 'Order 1'
  };

  const state = ordersReducer(
    previousState,
    createOrder.fulfilled(apiResponse, 'fulfilled', [])
  );

  expect(state).toEqual({
    ...initialState,
    currentOrder: mockOrder,
    isLoading: false
  });
});

test('Должен обрабатывать createOrder.rejected', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const state = ordersReducer(
    previousState,
    createOrder.rejected(new Error(`Ошибка создания заказа`), 'rejected', [])
  );

  expect(state).toEqual({
    ...initialState,
    isLoading: false,
    error: `Ошибка создания заказа`
  });
});

test('Должен обрабатывать fetchorders.pending', () => {
  const state = ordersReducer(
    initialState,
    fetchOrders.pending('pending', undefined)
  );
  expect(state).toEqual({
    ...initialState,
    isLoading: true
  });
});

test('Должен обрабатывать fetchorders.fulfilled', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const state = ordersReducer(
    previousState,
    fetchOrders.fulfilled(mockOrders, 'fulfilled', undefined)
  );

  expect(state).toEqual({
    ...initialState,
    orders: mockOrders,
    isLoading: false
  });
});

test('Должен обрабатывать fetchorders.rejected', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const state = ordersReducer(
    previousState,
    fetchOrders.rejected(
      new Error(`Не удалось выполнить заказы`),
      'rejected',
      undefined
    )
  );

  expect(state).toEqual({
    ...initialState,
    isLoading: false,
    error: `Не удалось выполнить заказы`
  });
});

test('Должен обрабатывать fetchOrderByNumber.pending', () => {
  const state = ordersReducer(
    initialState,
    fetchOrderByNumber.pending('pending', 123)
  );
  expect(state).toEqual({
    ...initialState,
    isLoading: true
  });
});

test('Должен обрабатывать fetchOrderByNumber.fulfilled', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const state = ordersReducer(
    previousState,
    fetchOrderByNumber.fulfilled(mockOrder, 'fulfilled', 123)
  );

  expect(state).toEqual({
    ...initialState,
    currentOrder: mockOrder,
    isLoading: false
  });
});

test('Должен обрабатывать fetchOrderByNumber.rejected', () => {
  const previousState = {
    ...initialState,
    isLoading: true
  };

  const state = ordersReducer(
    previousState,
    fetchOrderByNumber.rejected(new Error(`Заказ не найден`), 'rejected', 123)
  );

  expect(state).toEqual({
    ...initialState,
    isLoading: false,
    error: `Заказ не найден`
  });
});

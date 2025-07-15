import { describe, expect } from '@jest/globals';
import feedsReducer, { fetchFeeds, initialState } from './feedSlice';

describe('Проверка feedSlice reducer', () => {
  const mockOrders = [
    {
      _id: '1',
      ingredients: [],
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 2
    }
  ];

  const mockFeedsResponse = {
    success: true,
    orders: mockOrders,
    total: 10,
    totalToday: 2
  };

  test('Должен обработать fetchFeed.pending', () => {
    const state = feedsReducer(
      initialState,
      fetchFeeds.pending('pending', undefined)
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Должен обработать fetchFeed.fulfilled', () => {
    const previousState = {
      ...initialState,
      isLoading: true
    };

    const state = feedsReducer(
      previousState,
      fetchFeeds.fulfilled(mockFeedsResponse, 'fulfilled', undefined)
    );

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      total: mockFeedsResponse.total,
      totalToday: mockFeedsResponse.totalToday,
      isLoading: false
    });
  });

  test('Должен обработать fetchFeed.rejected', () => {
    const previousState = {
      ...initialState,
      isLoading: true
    };

    const state = feedsReducer(
      previousState,
      fetchFeeds.rejected(
        new Error(`Ошибка подключения`),
        'rejected',
        undefined
      )
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: `Ошибка подключения`
    });
  });
});

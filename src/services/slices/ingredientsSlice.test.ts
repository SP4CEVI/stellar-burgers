import { describe, expect } from '@jest/globals';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('Проверка ingredientsSlice reducer', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '12',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
    },
    {
      _id: '13',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
    }
  ];

  test('Должен обработать fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('pending', undefined)
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Должен обработать fetchIngredients.fulfilled', () => {
    const previousState = {
      ...initialState,
      isLoading: true
    };

    const state = ingredientsReducer(
      previousState,
      fetchIngredients.fulfilled(mockIngredients, 'fulfilled', undefined)
    );

    expect(state).toEqual({
      ...initialState,
      items: mockIngredients,
      isLoading: false
    });
  });

  test('Должен обработать fetchIngredients.rejected', () => {
    const previousState = {
      ...initialState,
      isLoading: true
    };

    const state = ingredientsReducer(
      previousState,
      fetchIngredients.rejected(
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

import { describe, expect, it } from '@jest/globals';
import constructorBurgerReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  initialState
} from './constructorSlice';

const mockIngredientsMains = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
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
    _id: '643d69a5c3f7b9001cfa093e',
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

const mockIngredientBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

describe('Проверка constructorBurgerSlice reducer', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(constructorBurgerReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('Должен добавлять булку', () => {
    const state = constructorBurgerReducer(
      initialState,
      addBun(mockIngredientBun)
    );
    expect(state.bun).toEqual(mockIngredientBun);
    expect(state.ingredients).toEqual([]);
  });

  it('Должен добавлять ингредиент', () => {
    const action = addIngredient(mockIngredientsMains[0]);
    const state = constructorBurgerReducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredientsMains[0],
      id: expect.any(String)
    });
  });

  it('Должен удалять ингредиент', () => {
    const action1 = addIngredient(mockIngredientsMains[0]);
    const action2 = addIngredient(mockIngredientsMains[1]);
    let state = constructorBurgerReducer(initialState, action1);
    state = constructorBurgerReducer(state, action2);

    const ingredientIdToRemove = state.ingredients[0].id;
    state = constructorBurgerReducer(
      state,
      removeIngredient(ingredientIdToRemove)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe(mockIngredientsMains[1]._id);
  });

  it('Должен перемещать ингредиент вверх', () => {
    const action1 = addIngredient(mockIngredientsMains[0]);
    const action2 = addIngredient(mockIngredientsMains[1]);
    let state = constructorBurgerReducer(initialState, action1);
    state = constructorBurgerReducer(state, action2);

    state = constructorBurgerReducer(state, moveIngredientUp(1));

    expect(state.ingredients[0]._id).toBe(mockIngredientsMains[1]._id);
    expect(state.ingredients[1]._id).toBe(mockIngredientsMains[0]._id);
  });

  it('Должен перемещать ингредиент вниз', () => {
    const action1 = addIngredient(mockIngredientsMains[0]);
    const action2 = addIngredient(mockIngredientsMains[1]);
    let state = constructorBurgerReducer(initialState, action1);
    state = constructorBurgerReducer(state, action2);

    state = constructorBurgerReducer(state, moveIngredientDown(0));

    expect(state.ingredients[0]._id).toBe(mockIngredientsMains[1]._id);
    expect(state.ingredients[1]._id).toBe(mockIngredientsMains[0]._id);
  });

  it('Должен очищать конструктор', () => {
    let state = constructorBurgerReducer(
      initialState,
      addBun(mockIngredientBun)
    );
    const action = addIngredient(mockIngredientsMains[0]);
    state = constructorBurgerReducer(state, action);

    state = constructorBurgerReducer(state, clearConstructor());

    expect(state).toEqual(initialState);
  });

  it('Не должен перемещать ингредиент вверх, если он первый', () => {
    const action1 = addIngredient(mockIngredientsMains[0]);
    const action2 = addIngredient(mockIngredientsMains[1]);
    let state = constructorBurgerReducer(initialState, action1);
    state = constructorBurgerReducer(state, action2);

    const stateBeforeMove = { ...state };
    state = constructorBurgerReducer(state, moveIngredientUp(0));

    expect(state).toEqual(stateBeforeMove);
  });

  it('Не должен перемещать ингредиент вниз, если он последний', () => {
    const action1 = addIngredient(mockIngredientsMains[0]);
    const action2 = addIngredient(mockIngredientsMains[1]);
    let state = constructorBurgerReducer(initialState, action1);
    state = constructorBurgerReducer(state, action2);

    const stateBeforeMove = { ...state };
    state = constructorBurgerReducer(state, moveIngredientDown(1));

    expect(state).toEqual(stateBeforeMove);
  });
});

import burgerIngredientsReducer, { initialState } from './burger-ingredients';
import {
  setBurgerIngredients, setLoadedStatus, setFailedStatus, increaseIngredientQuantity,
  decreaseIngredientQuantity, resetAllQuantities
} from '../actions/burger-ingredients';
import { testIngredients } from '../../utils/test-data';

describe('burger-ingredients reducer', () => {

  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle setBurgerIngredients', () => {
    expect(burgerIngredientsReducer(initialState, setBurgerIngredients(testIngredients)))
      .toEqual({ ...initialState, data: testIngredients });
  });

  it('should handle setLoadedStatus', () => {
    expect(burgerIngredientsReducer(initialState, setLoadedStatus(true)))
      .toEqual({ ...initialState, dataIsLoaded: true });

    expect(burgerIngredientsReducer({ ...initialState, dataIsLoaded: true }, setLoadedStatus(false)))
      .toEqual({ ...initialState, dataIsLoaded: false });
  });

  it('should handle setFailedStatus', () => {
    expect(burgerIngredientsReducer(initialState, setFailedStatus(true))).toEqual({ ...initialState, requestHasFailed: true });

    expect(burgerIngredientsReducer({ ...initialState, requestHasFailed: true }, setFailedStatus(false)))
      .toEqual({ ...initialState, requestHasFailed: false });
  });

  it('should handle increaseIngredientQuantity', () => {
    expect(burgerIngredientsReducer({ ...initialState, data: testIngredients }, increaseIngredientQuantity('sauce-1', 1)))
      .toEqual({
        ...initialState,
        data: {
          ...testIngredients,
          sauce: [
            testIngredients.sauce[0],
            { ...testIngredients.sauce[1], quantity: 1 },
            testIngredients.sauce[2]]
        }
      });

    expect(burgerIngredientsReducer({
      ...initialState,
      data: {
        ...testIngredients,
        bun: [
          testIngredients.bun[0],
          { ...testIngredients.bun[1], quantity: 0 },
        ]
      }
    }, increaseIngredientQuantity('bun-1', 2)))
      .toEqual({
        ...initialState,
        data: {
          ...testIngredients,
          bun: [
            testIngredients.bun[0],
            { ...testIngredients.bun[1], quantity: 2 },
          ]
        }
      });
  });

  it('should handle decreaseIngredientQuantity', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      data: {
        ...testIngredients,
        sauce: [
          testIngredients.sauce[0],
          { ...testIngredients.sauce[1], quantity: 4 },
          testIngredients.sauce[2]]
      }
    }, decreaseIngredientQuantity('sauce-1', 1)))
      .toEqual({
        ...initialState,
        data: {
          ...testIngredients,
          sauce: [
            testIngredients.sauce[0],
            { ...testIngredients.sauce[1], quantity: 3 },
            testIngredients.sauce[2]]
        }
      });

    expect(burgerIngredientsReducer({
      ...initialState,
      data: {
        ...testIngredients,
        bun: [
          testIngredients.bun[0],
          { ...testIngredients.bun[1], quantity: 2 },
        ]
      }
    }, decreaseIngredientQuantity('bun-1', 2)))
      .toEqual({
        ...initialState,
        data: {
          ...testIngredients,
          bun: [
            testIngredients.bun[0],
            { ...testIngredients.bun[1], quantity: 0 },
          ]
        }
      });

    expect(burgerIngredientsReducer({
      ...initialState,
      data: {
        ...testIngredients,
        sauce: [
          testIngredients.sauce[0],
          { ...testIngredients.sauce[1], quantity: 0 },
          testIngredients.sauce[2]]
      }
    }, decreaseIngredientQuantity('sauce-1', 1)))
      .toEqual({
        ...initialState,
        data: {
          ...testIngredients,
          sauce: [
            testIngredients.sauce[0],
            { ...testIngredients.sauce[1], quantity: 0 },
            testIngredients.sauce[2]]
        }
      });
  });

  it('should handle resetAllQuantities', () => {
    expect(burgerIngredientsReducer({
      ...initialState,
      data: {
        bun: [
          { ...testIngredients.bun[0], quantity: 2 },
          testIngredients.bun[1]
        ]
        ,
        main: [
          testIngredients.main[0],
          testIngredients.main[1],
          { ...testIngredients.main[2], quantity: 5 }
        ],
        sauce: [
          testIngredients.sauce[0],
          { ...testIngredients.sauce[1], quantity: 3 },
          { ...testIngredients.sauce[2], quantity: 1 }
        ]
      }
    }, resetAllQuantities()))
      .toEqual({ ...initialState, data: testIngredients });
  });
});
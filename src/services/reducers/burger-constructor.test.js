import burgerConstructorReducer, { initialState } from "./burger-constructor";
import { addConstructorItem, removeConstructorItem, moveConstructorItem, showBunError, hideBunError, resetConstructor } from '../actions/burger-constructor';
import { testIngredients } from "../../utils/test-data";

describe('burger-constructor reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle addConstructorItem', () => {
    expect(burgerConstructorReducer(initialState, addConstructorItem(testIngredients.bun[0])))
      .toEqual({
        ...initialState,
        data: {
          bun: testIngredients.bun[0],
          middle: initialState.data.middle
        }
      });

    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: testIngredients.bun[0],
        middle: initialState.data.middle
      }
    }, addConstructorItem(testIngredients.bun[1])))
      .toEqual({
        ...initialState,
        data: {
          bun: testIngredients.bun[1],
          middle: initialState.data.middle
        }
      });

    expect(burgerConstructorReducer(initialState, addConstructorItem(testIngredients.main[2])))
      .toEqual({
        ...initialState,
        data: {
          bun: initialState.data.bun,
          middle: [{ ...testIngredients.main[2], constructorId: 0 }]
        },
        nextConstructorId: 1
      });

    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: initialState.data.bun,
        middle: [{ ...testIngredients.main[2], constructorId: 0 }]
      },
      nextConstructorId: 1
    }, addConstructorItem(testIngredients.sauce[1])))
      .toEqual({
        ...initialState,
        data: {
          bun: initialState.data.bun,
          middle: [
            { ...testIngredients.main[2], constructorId: 0 },
            { ...testIngredients.sauce[1], constructorId: 1 }
          ]
        },
        nextConstructorId: 2
      });
  });

  it('should handle removeConstructorItem', () => {
    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: initialState.data.bun,
        middle: [
          { ...testIngredients.main[2], constructorId: 0 },
          { ...testIngredients.sauce[1], constructorId: 1 },
          { ...testIngredients.main[0], constructorId: 2 }
        ]
      },
      nextConstructorId: 3
    }, removeConstructorItem(1)))
      .toEqual({
        ...initialState,
        data: {
          bun: initialState.data.bun,
          middle: [
            { ...testIngredients.main[2], constructorId: 0 },
            { ...testIngredients.main[0], constructorId: 2 }
          ]
        },
        nextConstructorId: 3
      });
  });

  it('should handle moveConstructorItem', () => {
    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: initialState.data.bun,
        middle: [
          { ...testIngredients.main[2], constructorId: 0 },
          { ...testIngredients.sauce[1], constructorId: 1 },
          { ...testIngredients.main[0], constructorId: 2 }
        ]
      },
      nextConstructorId: 3
    }, moveConstructorItem(2, 0)))
      .toEqual({
        ...initialState,
        data: {
          bun: initialState.data.bun,
          middle: [
            { ...testIngredients.main[0], constructorId: 2 },
            { ...testIngredients.main[2], constructorId: 0 },
            { ...testIngredients.sauce[1], constructorId: 1 }
          ]
        },
        nextConstructorId: 3
      });
  });

  it('should handle showBunError', () => {
    expect(burgerConstructorReducer(initialState, showBunError()))
      .toEqual({
        ...initialState,
        showBunError: true
      });
  });

  it('should handle hideBunError', () => {
    expect(burgerConstructorReducer({
      ...initialState,
      showBunError: true
    }, hideBunError()))
      .toEqual({
        ...initialState,
        showBunError: false
      });
  });

  it('should handle resetConstructor', () => {
    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: testIngredients.bun[1],
        middle: [
          { ...testIngredients.main[0], constructorId: 2 },
          { ...testIngredients.main[2], constructorId: 0 },
          { ...testIngredients.sauce[1], constructorId: 1 }
        ]
      },
      nextConstructorId: 3
    }, resetConstructor()))
      .toEqual(initialState);

    expect(burgerConstructorReducer({
      ...initialState,
      data: {
        bun: initialState.data.bun,
        middle: [
          { ...testIngredients.main[0], constructorId: 2 },
          { ...testIngredients.main[2], constructorId: 0 },
          { ...testIngredients.sauce[1], constructorId: 1 }
        ]
      },
      nextConstructorId: 3,
      showBunError: true
    }, resetConstructor()))
      .toEqual(initialState);
  })
});
import { INGREDIENTS_URL } from "../../utils/constants";
import { addProperty, groupByType, request } from "../../utils/functions";

const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
const SET_FAILED_STATUS = 'SET_FAILED_STATUS';
const INCREASE_INGREDIENT_QUANTITY = 'INCREASE_INGREDIENT_QUANTITY';
const DECREASE_INGREDIENT_QUANTITY = 'DECREASE_INGREDIENT_QUANTITY';
const RESET_ALL_QUANTITIES = 'RESET_ALL_QUANTITIES';

const setBurgerIngredients = (data) => ({
  type: SET_BURGER_INGREDIENTS,
  data
});

const setLoadedStatus = (status) => ({
  type: SET_LOADED_STATUS,
  status
});

const setFailedStatus = (status) => ({
  type: SET_FAILED_STATUS,
  status
});

const increaseIngredientQuantity = (id, increaseAmount) => ({
  type: INCREASE_INGREDIENT_QUANTITY,
  id,
  increaseAmount
});

const decreaseIngredientQuantity = (id, decreaseAmount) => ({
  type: DECREASE_INGREDIENT_QUANTITY,
  id,
  decreaseAmount
});

const resetAllQuantities = () => ({
  type: RESET_ALL_QUANTITIES
});

const getIngredients = () => dispatch => {
  dispatch({
    type: SET_LOADED_STATUS,
    status: false
  });
  dispatch({
    type: SET_FAILED_STATUS,
    status: false
  });
  request(INGREDIENTS_URL)
    .then(({ data: serverData }) => {
      const processedData = groupByType(addProperty(serverData, 'quantity', 0));
      dispatch(setBurgerIngredients(processedData));
      dispatch(setLoadedStatus(true));
    })
    .catch(error => {
      dispatch(setFailedStatus(true));
      console.log(error);
    });
}

export {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS, INCREASE_INGREDIENT_QUANTITY,
  DECREASE_INGREDIENT_QUANTITY, RESET_ALL_QUANTITIES, setBurgerIngredients, setLoadedStatus,
  setFailedStatus, increaseIngredientQuantity, decreaseIngredientQuantity, resetAllQuantities,
  getIngredients
};
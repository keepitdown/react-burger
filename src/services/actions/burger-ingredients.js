import { INGREDIENTS_URL } from "../../utils/constants";
import { addProperty, groupByType, request } from "../../utils/functions";

const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
const SET_DETAILS_SEARCH_STATUS = 'SET_DETAILS_SEARCH_STATUS';
const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
const SET_FAILED_STATUS = 'SET_FAILED_STATUS';
const INCREASE_INGREDIENT_QUANTITY = 'INCREASE_INGREDIENT_QUANTITY';
const DECREASE_INGREDIENT_QUANTITY = 'DECREASE_INGREDIENT_QUANTITY';
const RESET_ALL_QUANTITIES = 'RESET_ALL_QUANTITIES';

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
      dispatch({
        type: SET_BURGER_INGREDIENTS,
        data: processedData
      });
      dispatch({
        type: SET_LOADED_STATUS,
        status: true
      });
    })
    .catch(error => {
      dispatch({
        type: SET_FAILED_STATUS,
        status: true
      });
      console.log(error);
    });
}

export {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS, SET_DETAILS_SEARCH_STATUS, getIngredients,
  INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY, RESET_ALL_QUANTITIES
};
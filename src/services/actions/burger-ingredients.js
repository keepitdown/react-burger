import { requestUrl } from "../../utils/constants";
import { addProperty, groupByType } from "../../utils/functions";

const SET_BURGER_INGREDIENTS = 'SET_BURGER_INGREDIENTS';
const SET_LOADED_STATUS = 'SET_LOADED_STATUS';
const SET_FAILED_STATUS = 'SET_FAILED_STATUS';
const INCREASE_INGREDIENT_QUANTITY = 'INCREASE_INGREDIENT_QUANTITY';
const DECREASE_INGREDIENT_QUANTITY = 'DECREASE_INGREDIENT_QUANTITY';

const getIngredients = () => dispatch => {
  fetch(requestUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error ${response.status}`);

    })
    .then((serverData) => {
      const processedData = groupByType(addProperty(serverData.data, 'quantity', 0));
      dispatch({
        type: SET_BURGER_INGREDIENTS,
        data: processedData
      });
      dispatch({ type: SET_LOADED_STATUS });
    })
    .catch((error) => {
      dispatch({ type: SET_FAILED_STATUS });
      console.log(error);
    });
}

export {
  SET_BURGER_INGREDIENTS, SET_LOADED_STATUS, SET_FAILED_STATUS, getIngredients,
  INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY
};
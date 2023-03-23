import { BASE_URL, INGREDIENTS_URL } from "../../utils/constants";
import { checkApiResponse } from "../../utils/functions";

const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';
const SHOW_DETAILS = 'SHOW_DETAILS';
const HIDE_DETAILS = 'HIDE_DETAILS';
const SET_DETAILS_FAILED_STATUS = 'SET_DETAILS_FAILED_STATUS';

const getIngredientDetails = (ingredientId) => dispatch => {
  fetch(`${BASE_URL}${INGREDIENTS_URL}`)
    .then(checkApiResponse)
    .then(({ data: serverData }) => {
      const ingredientData = { ...serverData.find(item => item._id === ingredientId) };
      dispatch({
        type: SET_INGREDIENT_DETAILS,
        data: ingredientData
      });
    })
    .catch(error => {
      dispatch({ type: SET_DETAILS_FAILED_STATUS });
      console.log(error);
    });
}

export { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS, SHOW_DETAILS, HIDE_DETAILS, SET_DETAILS_FAILED_STATUS, getIngredientDetails };
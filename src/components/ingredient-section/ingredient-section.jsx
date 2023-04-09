import React, { useEffect, useState } from 'react';
import styles from './ingredient-section.module.css';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { REMOVE_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { getIngredients } from '../../services/actions/burger-ingredients';

function IngredientSection() {

  const dispatch = useDispatch();

  const [ingredientNotFound, setIngredientNotFound] = useState(false);

  const { id: ingredientId } = useParams();

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  const ingredientData = useSelector(state => state.ingredientDetails.data);

  useEffect(() => {
    dispatch(getIngredients());
    return () => dispatch({ type: REMOVE_INGREDIENT_DETAILS });
  }, []);

  useEffect(() => {
    if (dataIsLoaded) {
      const ingredientData = { ...Object.values(availableIngredients).flat().find(item => item._id === ingredientId) };
      !Object.keys(ingredientData).length && setIngredientNotFound(true);
      dispatch({
        type: SET_INGREDIENT_DETAILS,
        data: ingredientData
      });
    }
  }, [ingredientId, dataIsLoaded, availableIngredients]);

  if (ingredientNotFound) {
    return (<Navigate to={`/ingredients/${ingredientId}`} state={{ ingredientNotFound: true }} />);
  }

  return (
    <section className={styles.container + ' mt-30'}>
      {!!Object.keys(ingredientData).length && (
        <>
          <h1 className={styles.heading + ' text text_type_main-large'}>Детали ингредиента</h1>
          <IngredientDetails />
        </>
      )}
    </section>
  )
}

export default IngredientSection;
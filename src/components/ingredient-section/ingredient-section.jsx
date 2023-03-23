import React, { useEffect } from 'react';
import styles from './ingredient-section.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getIngredientDetails, REMOVE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';

function IngredientSection() {

  const dispatch = useDispatch();

  const { id: ingredientId } = useParams();

  useEffect(() => {
    dispatch(getIngredientDetails(ingredientId));
    return () => dispatch({ type: REMOVE_INGREDIENT_DETAILS });
  }, [ingredientId]);

  const ingredientsData = useSelector(state => state.ingredientDetails.data);

  return (
    <section className={styles.container + ' mt-30'}>
      {!!Object.keys(ingredientsData).length && (
        <>
          <h1 className={styles.heading + ' text text_type_main-large'}>Детали ингредиента</h1>
          <IngredientDetails />
        </>
      )}
    </section>
  )
}

export default IngredientSection;
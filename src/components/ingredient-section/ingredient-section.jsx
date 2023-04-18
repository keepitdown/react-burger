import React, { useEffect, useState } from 'react';
import styles from './ingredient-section.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientSection() {

  const [ingredientData, setIngredientData] = useState({});

  const navigate = useNavigate();

  const { id: ingredientId } = useParams();

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  useEffect(() => {
    if (dataIsLoaded) {
      const ingredientData = { ...Object.values(availableIngredients).flat().find(item => item._id === ingredientId) };
      if (!Object.keys(ingredientData).length) {
        navigate(`/ingredients/${ingredientId}`, { state: { ingredientNotFound: true }, replace: true });
      } else {
        setIngredientData(ingredientData);
      }
    }
  }, [ingredientId, dataIsLoaded, availableIngredients]);

  return (!!Object.keys(ingredientData).length && (
    <section className={styles.container + ' mt-30'}>
      <h1 className={styles.heading + ' text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails ingredientData={ingredientData} />
    </section>
  ));
}

export default IngredientSection;
import React, { FC, useEffect, useState } from 'react';
import styles from './ingredient-section.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { TIngredient } from '../../utils/types';

const IngredientSection: FC = () => {

  const [ingredientData, setIngredientData] = useState<TIngredient>();

  const navigate = useNavigate();

  const { id: ingredientId } = useParams();

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  useEffect(() => {
    if (dataIsLoaded) {
      const ingredientData = Object.values(availableIngredients).flat().find(item => item._id === ingredientId);
      if (!ingredientData) {
        navigate(`/ingredients/${ingredientId}`, { state: { ingredientNotFound: true }, replace: true });
      } else {
        setIngredientData({ ...ingredientData });
      }
    }
  }, [ingredientId, dataIsLoaded, availableIngredients]);

  if (!ingredientData) {
    return null;
  }

  return (
    <section className={styles.container + ' mt-30'}>
      <h1 className={styles.heading + ' text text_type_main-large'}>Детали ингредиента</h1>
      <IngredientDetails ingredientData={ingredientData} />
    </section>
  );
};

export default IngredientSection;
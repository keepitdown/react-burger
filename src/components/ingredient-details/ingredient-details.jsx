import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import ValueItem from '../value-item/value-item';
import NutritionalValues from '../nutritional-values/nutritional-values';

function IngredientDetails() {

  const ingredientData = useSelector(state => state.ingredientDetails.data);

  return (
    <>
      <img src={ingredientData.image_large} alt={ingredientData.name} className={styles.image}/>
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredientData.name}</h3>
      <NutritionalValues>
        <ValueItem value={ingredientData.calories}>Калории,ккал</ValueItem>
        <ValueItem value={ingredientData.proteins}>Белки, г</ValueItem>
        <ValueItem value={ingredientData.fat}>Жиры, г</ValueItem>
        <ValueItem value={ingredientData.carbohydrates}>Углеводы, г</ValueItem>
      </NutritionalValues>
    </>
  )
}

export default IngredientDetails;
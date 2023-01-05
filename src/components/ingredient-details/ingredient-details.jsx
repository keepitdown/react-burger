import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import ValueItem from '../value-item/value-item';
import NutritionalValues from '../nutritional-values/nutritional-values';

function IngredientDetails({ ingredientData }) {
  return (
    <>
      <img src={ingredientData.image_large} alt={ingredientData.name} />
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

IngredientDetails.propTypes = {
  ingredientData: PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string
        })
};

export default IngredientDetails;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';

function IngredientModal() {

  const [ingredientData, setIngredientData] = useState({});

  const { dataIsLoaded, availableIngredients } = useSelector(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  const { id: ingredientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataIsLoaded) {
      const ingredientData = { ...Object.values(availableIngredients).flat().find(item => item._id === ingredientId) };
      setIngredientData(ingredientData);
    }
  }, [ingredientId, dataIsLoaded, availableIngredients]);

  return (!!Object.keys(ingredientData).length && (
    <Modal
      header="Детали ингредиента"
      closeHandler={() => navigate(-1)}
    >
      <IngredientDetails ingredientData={ingredientData} />
    </Modal>
  ));
}

export default IngredientModal;
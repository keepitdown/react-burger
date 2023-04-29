import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';
import { TIngredient } from '../utils/types';

const IngredientModal: FC = () => {

  const [ingredientData, setIngredientData] = useState<TIngredient>();

  const { dataIsLoaded, availableIngredients } = useSelector<any, { dataIsLoaded: boolean, availableIngredients: TIngredient[] }>(state => ({
    dataIsLoaded: state.burgerIngredients.dataIsLoaded,
    availableIngredients: state.burgerIngredients.data
  }));

  const { id: ingredientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataIsLoaded) {
      const ingredientData = Object.values(availableIngredients).flat().find(item => item._id === ingredientId) as TIngredient;
      setIngredientData({ ...ingredientData });
    }
  }, [ingredientId, dataIsLoaded, availableIngredients]);

  if (!ingredientData) {
    return null;
  }

  return (
    <Modal
      header="Детали ингредиента"
      closeHandler={() => navigate(-1)}
    >
      <IngredientDetails ingredientData={ingredientData} />
    </Modal>
  );
};

export default IngredientModal;
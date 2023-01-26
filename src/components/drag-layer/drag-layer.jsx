import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDragLayer } from 'react-dnd'
import styles from './drag-layer.module.css';
import { addedIngredient, movedIngredient } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function DragLayer() {

  const layerPortal = useRef(document.getElementById('drag-preview'));

  const constructorIngredients = useSelector(state => state.burgerConstructor.data.middle);
  const availableIngredients = useSelector(state => state.burgerIngredients.data);

  const { isDragging, draggedItem, type, position } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    draggedItem: monitor.getItem(),
    type: monitor.getItemType(),
    position: monitor.getSourceClientOffset()
  }));

  const previewStyles = isDragging && position && {
    transform: `translate(${position.x}px, ${position.y}px)`
  }

  const renderPreviewElement = () => {
    switch (type) {
      case movedIngredient: {
        const ingredientData = constructorIngredients.find(item => item.constructorId === draggedItem.constructorId);
        return (
          <div className={styles.container + ' pl-4 pr-4'}>
            <div className={styles['icon-container']}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              text={ingredientData.name}
              price={ingredientData.price}
              thumbnail={ingredientData.image}
            />
          </div>
        )
      }
      case addedIngredient: {
        const ingredientData = Object.values(availableIngredients).flat().find(item => item._id === draggedItem.id);
        return (
          <li className={styles['container-add']}>
            <img src={ingredientData.image} alt={ingredientData.name} className={styles['image-add'] + ' pl-4 pr-4'} />
            <p className={styles['ingredient-name'] + ' text text_type_main-default'}>{ingredientData.name}</p>
          </li>
        )
      }
    }
  }


  return createPortal(
    isDragging && (
      <div className={styles.layer}>
        <div style={previewStyles}>
          {renderPreviewElement()}
        </div>
      </div>
    ), layerPortal.current);
}

export default DragLayer;
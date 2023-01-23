import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDragLayer } from 'react-dnd'
import PropTypes from 'prop-types';
import styles from './drag-layer.module.css';
import { movedIngredient } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function DragLayer() {

  const layerPortal = useRef(document.getElementById('drag-preview'));

  const constructorIngredients = useSelector(state => state.burgerConstructor.data.middle);

  const { isDragging, draggedItem, type, position, position2 } = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
    draggedItem: monitor.getItem(),
    type: monitor.getItemType(),
    position: monitor.getSourceClientOffset(),
    position2: monitor.getClientOffset()
  }));

  const previewStyles = isDragging && {
    transform: `translate(${position.x}px, ${position.y}px)`
  }

  const renderPreviewElement = () => {
    switch (type) {
      case movedIngredient:
        console.log('reg' + position.x + ' ' + position.y);
        console.log(position2);
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
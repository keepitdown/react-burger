import React, { ReactNode, CSSProperties, FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDragLayer } from 'react-dnd'
import styles from './drag-layer.module.css';
import { addedIngredient, movedIngredient } from '../../utils/constants';
import { useSelector } from '../../services/hooks';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TConstructorIngredient, TItemDragData, TConstructorItemDragData, TIngredientsItemDragData, TIngredient } from '../../utils/types';
import { XYCoord, Identifier } from 'dnd-core';

const DragLayer: FC = () => {

  const layerPortal = useRef(document.getElementById('drag-preview') as HTMLDivElement);

  const constructorIngredients = useSelector(state => state.burgerConstructor.data.middle);
  const availableIngredients = useSelector(state => state.burgerIngredients.data);

  const { draggedItem, type, position } = useDragLayer<{ draggedItem: TItemDragData; type: Identifier | null; position: XYCoord | null }>(monitor => ({
    draggedItem: monitor.getItem(),
    type: monitor.getItemType(),
    position: monitor.getSourceClientOffset()
  }));

  const getPreviewStyles = (): CSSProperties => ({
    transform: `translate(${position!.x}px, ${position!.y}px)`
  });

  const renderPreviewElement = (): ReactNode => {
    switch (type) {
      case movedIngredient: {
        const ingredientData = constructorIngredients.find(item => item.constructorId === (draggedItem as TConstructorItemDragData).constructorId) as TConstructorIngredient;
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
        const ingredientData = Object.values(availableIngredients).flat().find(item => item._id === (draggedItem as TIngredientsItemDragData).id) as TIngredient;
        return (
          <li className={styles['container-add']}>
            <img src={ingredientData.image} alt={ingredientData.name} className={styles['image-add'] + ' pl-4 pr-4'} />
            <p className={styles['ingredient-name'] + ' text text_type_main-default'}>{ingredientData.name}</p>
          </li>
        )
      }
      default:
        return null;
    }
  };

  return createPortal(
    position && (
      <div className={styles.layer}>
        <div style={getPreviewStyles()}>
          {renderPreviewElement()}
        </div>
      </div>
    ), layerPortal.current);
};

export default DragLayer;
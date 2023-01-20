import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './dragable-container.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MOVE_CONSTRUCTOR_ITEM } from '../../services/actions/burger-constructor';

function DragableContainer({ constructorId, index, children }) {

  const dispatch = useDispatch();
  const draggableIngredinets = useSelector(state => state.burgerConstructor.data.middle);

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'movedIngredient',
    item: { constructorId },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  });

  const [, dropRef] = useDrop({
    accept: 'movedIngredient',
    hover(dragContainer) {

        if (dragContainer.constructorId !== constructorId) {
          console.log(index);
          const movedIngredientIndex = draggableIngredinets.findIndex(item => item.constructorId === dragContainer.constructorId);
          const movedIngredient = { ...draggableIngredinets[movedIngredientIndex] };
          const updatedArray = [...draggableIngredinets];
          updatedArray.splice(movedIngredientIndex, 1);
          updatedArray.splice(index, 0, movedIngredient);
          /*dispatch({
            type: MOVE_CONSTRUCTOR_ITEM,
            updatedArray
          });*/
        }
    }
  });

  return (
    <div className={styles.container + (isDragging ? (' ' + styles.dragging) : '') + ' pl-4 pr-4' + ((index > 0) ? ' mt-4' : '')} ref={(node) => previewRef(dropRef(node))}>
      <div className={styles['icon-container']} ref={dragRef}>
        <DragIcon type="primary" />
      </div>
      {children}
    </div>
  );
}

DragableContainer.propTypes = {
  constructorId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired
};

export default DragableContainer;
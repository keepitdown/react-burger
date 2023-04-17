import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styles from './dragable-container.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MOVE_CONSTRUCTOR_ITEM } from '../../services/actions/burger-constructor';
import { movedIngredient } from '../../utils/constants';

function DragableContainer({ constructorId, children, index }) {

  const dispatch = useDispatch();
  const constructorIngredinets = useSelector(state => state.burgerConstructor.data.middle);

  const originalIndex = constructorIngredinets.findIndex(item => item.constructorId === constructorId);

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: movedIngredient,
    item: { constructorId, originalIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        const movedItemIndex = constructorIngredinets.findIndex(item => item.constructorId === draggedItem.constructorId);
        dispatch({
          type: MOVE_CONSTRUCTOR_ITEM,
          movedItemIndex,
          targetIndex: draggedItem.originalIndex
        });
      }
    }
  }, [constructorId, originalIndex]);

  const [, dropRef] = useDrop({
    accept: movedIngredient,
    hover(draggedItem) {
      if (draggedItem.constructorId !== constructorId) {
        const movedItemIndex = constructorIngredinets.findIndex(item => item.constructorId === draggedItem.constructorId);
        const targetIndex = constructorIngredinets.findIndex(item => item.constructorId === constructorId);
        dispatch({
          type: MOVE_CONSTRUCTOR_ITEM,
          movedItemIndex,
          targetIndex
        });
      }
    }
  }, [constructorId, constructorIngredinets, dispatch]);

  useEffect(() => {
    preview(getEmptyImage())
  }, [])

  return (
    <div className={styles.container + (isDragging ? (' ' + styles.dragging) : '') + ' pl-4 pr-4' + ((index > 0) ? ' mt-4' : '')} ref={(node) => dragRef(dropRef(node))}>
      <div className={styles['icon-container']}>
        <DragIcon type="primary" />
      </div>
      {children}
    </div>
  );
}

DragableContainer.propTypes = {
  constructorId: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired
};

export default DragableContainer;
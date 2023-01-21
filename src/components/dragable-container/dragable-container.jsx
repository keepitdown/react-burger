import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styles from './dragable-container.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MOVE_CONSTRUCTOR_ITEM } from '../../services/actions/burger-constructor';

function DragableContainer({ constructorId, children, index }) {


  const dispatch = useDispatch();
  //const draggableIngredinets = [...useSelector(state => state.burgerConstructor.data.middle)];

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'movedIngredient',
    item: { constructorId },
    collect: monitor => ({ isDragging: monitor.isDragging() })
  }, [constructorId]);

  const [, dropRef] = useDrop({
    accept: 'movedIngredient',
    hover(draggedItem) {

        if (draggedItem.constructorId !== constructorId) {
          //const draggedItemIndex = draggableIngredinets.findIndex(item => item.constructorId === draggedItem.constructorId);
          //const targetIndex = draggableIngredinets.findIndex(item => item.constructorId === constructorId);
          //console.log(`moved: ${draggedItemIndex}`);
          //console.log(`target: ${targetIndex}`);
          dispatch({
            type: MOVE_CONSTRUCTOR_ITEM,
            movedConstructorId: draggedItem.constructorId,
            targetConstructorId: constructorId
          });
        }
    }
  }, [constructorId, dispatch]);

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
  children: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired
};

export default DragableContainer;
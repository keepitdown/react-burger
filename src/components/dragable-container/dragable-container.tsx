import React, { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styles from './dragable-container.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { moveConstructorItem } from '../../services/actions/burger-constructor';
import { movedIngredient } from '../../utils/constants';
import { TConstructorItemDragData, TConstructorIngredient } from '../../utils/types';

type TDragableContainer = {
  constructorId: number;
  children: ReactNode;
  index: number;
};

const DragableContainer: FC<TDragableContainer> = ({ constructorId, children, index }) => {

  const dispatch = useDispatch();
  const constructorIngredinets = useSelector<any, TConstructorIngredient[]>(state => state.burgerConstructor.data.middle);

  const originalIndex = constructorIngredinets.findIndex(item => item.constructorId === constructorId);

  const [{ isDragging }, dragRef, preview] = useDrag<TConstructorItemDragData, any, { isDragging: boolean }>({
    type: movedIngredient,
    item: { constructorId, originalIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        const movedItemIndex = constructorIngredinets.findIndex(item => item.constructorId === draggedItem.constructorId);
        dispatch(moveConstructorItem(movedItemIndex, draggedItem.originalIndex));
      }
    }
  }, [constructorId, originalIndex]);

  const [, dropRef] = useDrop<TConstructorItemDragData>({
    accept: movedIngredient,
    hover(draggedItem) {
      if (draggedItem.constructorId !== constructorId) {
        const movedItemIndex = constructorIngredinets.findIndex(item => item.constructorId === draggedItem.constructorId);
        const targetIndex = constructorIngredinets.findIndex(item => item.constructorId === constructorId);
        dispatch(moveConstructorItem(movedItemIndex, targetIndex));
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
};

export default DragableContainer;
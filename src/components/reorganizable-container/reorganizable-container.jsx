import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './reorganizable-container.module.css';

function ReorganizableContainer({children}) {

  const [, dropRef] = useDrop({
    accept: 'movedIngredient'
  });

  return (
    <div className={styles['scrollable-container'] + ' custom-scroll'} ref={dropRef}>
      {children}
    </div>
  );
}

ReorganizableContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default ReorganizableContainer;
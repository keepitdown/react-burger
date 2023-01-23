import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';

const IngredientsList = forwardRef(
  function ({ children, scrollHandler }, passedRef) {

    return (
      <div className={styles.container + " mt-10 custom-scroll"} onScroll={scrollHandler} ref={passedRef}>
        {children}
      </div>
    )
  });

IngredientsList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  scrollHandler: PropTypes.func
};

export default IngredientsList;
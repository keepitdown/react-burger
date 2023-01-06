import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';

function IngredientsList({ children }) {

  return (
    <div className={styles.container + " mt-10 custom-scroll"}>
      {children}
    </div>
  )
}

IngredientsList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default IngredientsList;
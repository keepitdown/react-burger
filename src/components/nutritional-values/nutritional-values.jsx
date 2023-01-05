import React from 'react';
import PropTypes from 'prop-types';
import styles from './nutritional-values.module.css';
import ValueItem from '../value-item/value-item';

function NutritionalValues({ children }) {
  return (
    <ul className={styles.container + ' mb-15'}>
      {children.map?.((item, index) => (
          <li key={index} className={styles.item + ((index > 0) ? ' ml-5' : '')}>
            {item}
          </li>
          ))
        ?? (<li>{children}</li>)
      }
    </ul>
  )
}

NutritionalValues.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default NutritionalValues;
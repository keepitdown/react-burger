import React from 'react';
import PropTypes from 'prop-types';
import styles from './tab-selector.module.css';

function TabSelector({ children }) {


  return (
    <ul className={styles['tab-selector']}>
      {
        children.map?.((item, index) => (
          <li key={index} >
            {item}
          </li>
        ))
        ?? (<li>{children}</li>)
      }
    </ul>
  )
}

TabSelector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default TabSelector;
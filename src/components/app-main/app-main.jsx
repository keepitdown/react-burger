import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-main.module.css';

function AppMain({ children }) {

  return (
    <main className={styles.main + ' pt-1 pb-1'}>
      {children}
    </main>
  )
}

AppMain.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default AppMain;
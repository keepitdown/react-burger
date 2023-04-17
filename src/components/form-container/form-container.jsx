import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-container.module.css';

function FormContainer({ heading, children }) {

  return (
    <section className={styles.container}>
      <h1 className={styles.heading + ' text text_type_main-medium mb-6'}>{heading}</h1>
      {children}
    </section>
  )
}

FormContainer.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default FormContainer;
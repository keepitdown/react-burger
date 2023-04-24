import React, { FC, ReactNode } from 'react';
import styles from './form-container.module.css';

type TFormContainer = {
  heading?: string;
  children: ReactNode
};

const FormContainer: FC<TFormContainer> = ({ heading, children }) => {

  return (
    <section className={styles.container}>
      <h1 className={styles.heading + ' text text_type_main-medium mb-6'}>{heading}</h1>
      {children}
    </section>
  );
};

export default FormContainer;
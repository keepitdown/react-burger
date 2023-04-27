import React, { FC, ReactNode } from 'react';
import styles from './nutritional-values.module.css';

type TNutritionalValues = {
  children: ReactNode;
};

const NutritionalValues: FC<TNutritionalValues> = ({ children }) => {
  return (
    <ul className={styles.container + ' mb-15'}>
      {Array.isArray(children) ? children.map?.((item: ReactNode, index) => (
        <li key={index} className={styles.item + ((index > 0) ? ' ml-5' : '')}>
          {item}
        </li>
      ))
        : (<li>{children}</li>)
      }
    </ul>
  )
};

export default NutritionalValues;
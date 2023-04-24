import React, { FC, ReactNode } from 'react';
import styles from './tab-selector.module.css';

type TTabSelector = {
  children: ReactNode;
};

const TabSelector: FC<TTabSelector> = ({ children }) => {


  return (
    <ul className={styles['tab-selector']}>
      {
        Array.isArray(children) ? children.map((item, index) => (
          <li key={index} >
            {item}
          </li>
        ))
          : (<li>{children}</li>)
      }
    </ul>
  );
};

export default TabSelector;
import React, { ReactNode, UIEvent, forwardRef } from 'react';
import styles from './ingredients-list.module.css';

type TIngredientsList = {
  children: ReactNode;
  scrollHandler: (e?: UIEvent) => any;
}

const IngredientsList = forwardRef<HTMLDivElement, TIngredientsList>(
  function ({ children, scrollHandler }, passedRef) {

    return (
      <div className={styles.container + ' mt-10 custom-scroll'} onScroll={scrollHandler} ref={passedRef}>
        {children}
      </div>
    )
  });

export default IngredientsList;
import React, {useState, useEffect} from 'react';
import styles from './ingridients-category.module.css';
import IngridientCard from '../ingridient-card/ingridient-card';

function IngridientsCategory({ children, categoryData }) {

  return (
    <>
      <h2 className="text text_type_main-medium">{children}</h2>
      <div className="pt-6 pb-10 pl-4">
        <ul className={styles['ingridients-list'] + ' pl-2'}>
          {categoryData &&
            <IngridientCard data={categoryData[0]} quantity={1} />
          }
        </ul>
      </div>
    </>
  )
}

export default IngridientsCategory;
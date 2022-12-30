import React, {useState, useEffect} from 'react';
import styles from './ingridients-category.module.css';
import IngridientCard from '../ingridient-card/ingridient-card';

function IngridientsCategory({ children, categoryData }) {

  return (
    <article>
      <h2 className="text text_type_main-medium">{children}</h2>
      <div className={styles.container + ' pt-6 pr-4 pb-10 pl-4'}>
        <ul className={styles['ingridients-list']}>
          {
            categoryData && categoryData.map((itemData, index) => {
              return (
                <IngridientCard key={index} data={itemData} quantity={1} isEven={index % 2} />
              )
            })
          }
        </ul>
      </div>
    </article>
  )
}

export default IngridientsCategory;
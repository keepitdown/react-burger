import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredients-category.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { TIngredient } from '../../utils/types';

type TIngredientsCategory = {
  children: string;
  categoryName: string;
};

const IngredientsCategory = forwardRef<HTMLElement, TIngredientsCategory>(
  ({ children, categoryName }, passedRef) => {

    const categoryData = useSelector<any, TIngredient[]>(state => state.burgerIngredients.data[categoryName]);

    return (
      <article ref={passedRef}>
        <h2 className="text text_type_main-medium">{children}</h2>
        <div className={styles.container + ' pt-6 pr-4 pb-10 pl-4'}>
          <ul className={styles['ingredients-list']}>
            {
              categoryData && categoryData.map((itemData, index) => {
                return (
                  <IngredientCard
                    key={itemData._id}
                    data={itemData}
                    isEven={!!(index % 2)}
                  />
                )
              })
            }
          </ul>
        </div>
      </article>
    )
  });

export default IngredientsCategory;
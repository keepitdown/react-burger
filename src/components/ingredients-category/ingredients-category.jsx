import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import ingredientType from '../../utils/types';

function IngredientsCategory({ children, categoryData, clickHandler }) {

  return (
    <article>
      <h2 className="text text_type_main-medium">{children}</h2>
      <div className={styles.container + ' pt-6 pr-4 pb-10 pl-4'}>
        <ul className={styles['ingredients-list']}>
          {
            categoryData && categoryData.map((itemData, index) => {
              return (
                <IngredientCard
                  key={index}
                  data={itemData}
                  quantity={1}
                  isEven={!!(index % 2)}
                  clickHandler={clickHandler}
                />
              )
            })
          }
        </ul>
      </div>
    </article>
  )
}

IngredientsCategory.propTypes= {
  children: PropTypes.string.isRequired,
  categoryData:  PropTypes.arrayOf(ingredientType).isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default IngredientsCategory;
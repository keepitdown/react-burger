import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

function IngredientsCategory({ children, categoryName }) {

const categoryData = useSelector(state => state.burgerIngredients.data[categoryName]);

  return (
    <article>
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
}

IngredientsCategory.propTypes= {
  children: PropTypes.string.isRequired,
  categoryName:  PropTypes.string.isRequired
};

export default IngredientsCategory;
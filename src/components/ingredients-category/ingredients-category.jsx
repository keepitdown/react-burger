import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-category.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

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
  categoryData:  PropTypes.arrayOf(
    PropTypes.shape({
      __v: PropTypes.number,
      _id: PropTypes.string,
      calories: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
      image: PropTypes.string,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      proteins: PropTypes.number,
      type: PropTypes.string
      })),
  clickHandler: PropTypes.func.isRequired
};

export default IngredientsCategory;
import React, { FC } from 'react';
import styles from './ingredient-preview.module.css';

type TIngredientPreview = {
  image: string;
  name: string;
  overlay?: string | null;
};

const IngredientPreview: FC<TIngredientPreview> = ({ image, name, overlay }) => {

  return (
    <div className={styles.gradient}>
      <div className={styles.background}>
        <img
          src={image}
          alt={name} className={styles.image} />
        {overlay && (
          <div className={styles.overlay + ' text text_type_main-default'}>
            {overlay}
          </div>
        )}
      </div>
    </div>
  )
};

export default IngredientPreview;
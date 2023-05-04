import React, { FC, CSSProperties } from 'react';
import styles from './order-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { useNavigate, useLocation } from 'react-router-dom';

type TOrderCard = {
  orderId: number;
  ingredients: any[];
  timestamp: string;
  status?: string;
  ingredientsDisplayed?: number,
  extraClass?: string;
};

const OrderCard: FC<TOrderCard> = ({ orderId, ingredients, timestamp, status, ingredientsDisplayed = 6, extraClass }) => {

  const getPreviewItemStyles = (index: number): CSSProperties => ({
    position: 'absolute',
    left: index * 48,
    zIndex: ingredientsDisplayed - index
  });

  const getOverlayText = (index: number) => {
    if ((index < (ingredientsDisplayed - 1)) || (ingredients.length <= ingredientsDisplayed)) {
      return null;
    }
    return `+${ingredients.length - ingredientsDisplayed}`
  };

  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (): void => {
    navigate(`/feed/${orderId}`, { state: { background: location } });
  };

  return (
    <article
      className={styles.container + ' pt-6 pr-6 pb-6 pl-6' + (extraClass ? (' ' + extraClass) : '')}
      onClick={clickHandler}
      >
      <div className={styles.identifiers}>
        <h2 className="text text_type_digits-default">
          {`#${orderId}`}
        </h2>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(timestamp)}
        />
      </div>
      <div className="mt-6 mb-6">
        <p className="text text_type_main-medium">
          Death Star Starship Main бургер
        </p>
        {status && (
          <p className="text text_type_main-default mt-2">
            {status}
          </p>
        )}
      </div>
      <div className={styles.details}>
        <ul className={styles.list}>
          {ingredients.slice(0, ingredientsDisplayed).map((item, index) => (
            <li
              key={index}
              style={getPreviewItemStyles(index)}
            >
              <IngredientPreview
                image={item.image}
                name={item.name}
                overlay={getOverlayText(index)}
              />
            </li>
          ))}
        </ul>
        <div className={styles['total-price'] + ' ml-6'}>
          <span className="text text_type_digits-default mr-2">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  )
};

export default OrderCard;
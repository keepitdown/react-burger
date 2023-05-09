import React, { FC, CSSProperties } from 'react';
import styles from './order-card.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { created, done, pending } from '../../utils/constants';
import { FormattedDate } from '../formatted-date/formatted-date';
import { TIngredient, TOrder, TPreviewData } from '../../utils/types';
import { getIngredientById } from '../../utils/functions';

type TOrderCard = {
  orderData: TOrder;
  displayStatus?: boolean;
  ingredientsDisplayed?: number,
  clickHandler: () => void;
  extraClass?: string;
};

const OrderCard: FC<TOrderCard> = ({ orderData, displayStatus, ingredientsDisplayed = 6, clickHandler, extraClass }) => {

  const { name: orderName, number: orderNumber, createdAt: timestamp, status, _id: orderId, ingredients } = orderData;

  const availableIngredients = useSelector(state => state.burgerIngredients.data);

  const [previewData, totalPrice] = ingredients.reduce<[TPreviewData[], number]>((result, ingredientId) => {
    const { name, image, price } = getIngredientById(availableIngredients, ingredientId) as TIngredient;
    const updatedPreviewData = [...result[0], { name, image }];
    const updatedTotalPrice = result[1] + price;
    return [updatedPreviewData, updatedTotalPrice];
  }, [[], 0]);

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

  return (
    <article
      className={styles.container + ' pt-6 pr-6 pb-6 pl-6' + (extraClass ? (' ' + extraClass) : '')}
      onClick={clickHandler}
    >
      <div className={styles.identifiers}>
        <h2 className="text text_type_digits-default">
          {`#${orderNumber}`}
        </h2>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(timestamp)}
        />
      </div>
      <div className="mt-6 mb-6">
        <p className="text text_type_main-medium">
          {orderName}
        </p>
        {displayStatus && (
          <p className="text text_type_main-default mt-2">
            {(status === done) && (<span className={styles['status-done']}>Выполнен</span>)}
            {(status === pending) && (<>Готовится</>)}
            {(status === created) && (<>Создан</>)}
          </p>
        )}
      </div>
      <div className={styles.details}>
        <ul className={styles.list}>
          {previewData.slice(0, ingredientsDisplayed).map((item, index) => (
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
          <span className="text text_type_digits-default mr-2">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  )
};

export default OrderCard;
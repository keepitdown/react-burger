import React, { FC } from 'react';
import styles from './order-details.module.css';
import OrderIngredients from '../order-ingredients/order-ingredients';
import { created, done, pending } from '../../utils/constants';
//================Удалить!===================
import { testIngredients, total } from '../../utils/test-data';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderDetails = {
  orderData: any;
  modal?: boolean;
  status: typeof done | typeof pending | typeof created;
};

const OrderDetails: FC<TOrderDetails> = ({ orderData, modal, status }) => {

  const statusText = {
    done: 'Выполнен',
    pending: 'Готовится',
    created: 'Создан'
  }

  return (
    <div className={styles.constainer + (modal ? ' mt-5 mb-10' : ' mb-10')}>
      <p className={'text text_type_main-medium' + (modal ? ' mb-2' : ' mb-3')}>Black Hole Singularity острый бургер</p>
      <p className={'text text_type_main-default mb-15' + ((status === done) ? (' ' + styles['status-done']) : '')}>
        {statusText[status]}
      </p>
      <OrderIngredients orderData={testIngredients} />
      <div className={styles['order-info'] + ' mt-10'}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date('2023-04-30T21:33:32.877Z')}
        />
        <div className={styles['total-price']}>
          <span className='text text_type_digits-default mr-2'>
            {total}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
};

export default OrderDetails;
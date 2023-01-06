import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Checkout from '../checkout/checkout';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ingredientType from '../../utils/types';

function BurgerConstructor({ selectedIngredients: { top, middle, bottom }, extraClass }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
        <div className={styles['ingredients-container'] + ' mt-25 mb-10'}>
          {top && (
            <div className="pl-8 mb-4 ml-4 mr-4">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={top.name + ' (верх)'}
                price={top.price}
                thumbnail={top.image}
              />
            </div>
          )}
          <div className={styles['scrollable-container'] + ' custom-scroll'}>
            {middle &&
              middle.map((item, index) => (
                <div key={index} className={styles['dragable-container'] + ' pl-4 pr-4' + ((index > 0) ? ' mt-4' : '')}>
                  <div className={styles['icon-container']}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              ))
            }
          </div>
          {bottom && (
            <div className="pl-8 mt-4 ml-4 mr-4">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bottom.name + ' (низ)'}
                price={bottom.price}
                thumbnail={bottom.image}
              />
            </div>
          )}
        </div>
        <Checkout
          ingredientsList={[top, ...middle, bottom]}
          extraClass="ml-4 mr-4"
          buttonHandler={() => setModalIsOpen(true)}
        />
      </section>
      {modalIsOpen && (
        <Modal setter={setModalIsOpen}>
          <OrderDetails orderNumber="034536" />
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.shape({
    top: ingredientType,
    middle: PropTypes.arrayOf(ingredientType),
    bottom: ingredientType
  }).isRequired,
  extraClass: PropTypes.string
};

export default BurgerConstructor;
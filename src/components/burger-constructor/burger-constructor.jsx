import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Checkout from '../checkout/checkout';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor({ selectedIngredients: {top, middle, bottom}, extraClass }) {

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
              text={top.name}
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
              text={bottom.name}
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
      <ModalOverlay setter={setModalIsOpen}>
          <Modal setter={setModalIsOpen}>
            <OrderDetails orderNumber="034536" />
          </Modal>
        </ModalOverlay>
    )}
    </>
  )
}

const ingredientObjectShape = PropTypes.shape({
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
  });

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.shape({
    top: ingredientObjectShape,
    middle: PropTypes.arrayOf(ingredientObjectShape),
    bottom: ingredientObjectShape
  }),
  extraClass: PropTypes.string
};

export default BurgerConstructor;
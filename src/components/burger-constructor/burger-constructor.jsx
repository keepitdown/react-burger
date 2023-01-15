import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Checkout from '../checkout/checkout';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { REMOVE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burger-constructor';
import { DECREASE_INGREDIENT_QUANTITY } from '../../services/actions/burger-ingredients';

function BurgerConstructor({ extraClass }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { bun, middle } = useSelector(state => state.burgerConstructor.data);

  const dispatch = useDispatch();

  const closeHandler = ({ constructorId, _id }) => {
    dispatch({
      type: REMOVE_CONSTRUCTOR_INGREDIENT,
      id: constructorId
    })
    dispatch({
      type: DECREASE_INGREDIENT_QUANTITY,
      id: _id,
      decreaseAmount: 1
    })
  };

  return (
    <>
      <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
        <div className={styles['ingredients-container'] + ' mt-25 mb-10'}>
          {!!Object.keys(bun).length && (
            <div className="pl-8 mb-4 ml-4 mr-4">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun.name + ' (верх)'}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
          <div className={styles['scrollable-container'] + ' custom-scroll'}>
            {middle &&
              middle.map((item, index) => (
                <div key={item.constructorId} className={styles['dragable-container'] + ' pl-4 pr-4' + ((index > 0) ? ' mt-4' : '')}>
                  <div className={styles['icon-container']}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => closeHandler(item)}
                  />
                </div>
              ))
            }
          </div>
          {!!Object.keys(bun).length && (
            <div className="pl-8 mt-4 ml-4 mr-4">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name + ' (низ)'}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
        </div>
        <Checkout
          ingredientsList={[bun, ...middle]}
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
  extraClass: PropTypes.string
};

export default BurgerConstructor;
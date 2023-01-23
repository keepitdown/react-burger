import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DragableContainer from '../dragable-container/dragable-container';
import Checkout from '../checkout/checkout';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderError from '../order-error/order-error';
import { REMOVE_CONSTRUCTOR_ITEM } from '../../services/actions/burger-constructor';
import { INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY } from '../../services/actions/burger-ingredients';
import { ADD_CONSTRUCTOR_ITEM } from '../../services/actions/burger-constructor';
import { HIDE_ORDER_DETAILS } from '../../services/actions/order-details';
import { addedIngredient } from '../../utils/constants';

function BurgerConstructor({ extraClass }) {

  const { modalIsOpen, sendingData, failedToSend } = useSelector(state => ({
    modalIsOpen: state.orderDetails.showDetails,
    sendingData: state.orderDetails.sendingData,
    failedToSend: state.orderDetails.failedToSend
  }));

  const { bun, middle } = useSelector(state => state.burgerConstructor.data);

  const dispatch = useDispatch();

  const closeHandler = ({ constructorId, _id }) => {
    dispatch({
      type: REMOVE_CONSTRUCTOR_ITEM,
      id: constructorId
    })
    dispatch({
      type: DECREASE_INGREDIENT_QUANTITY,
      id: _id,
      decreaseAmount: 1
    })
  };

  const { availableIngredients, selectedBun } = useSelector(state => ({
    selectedBun: state.burgerConstructor.data.bun,
    availableIngredients: state.burgerIngredients.data
  }));

  const [{ isHovered }, dropTargetRef] = useDrop({
    accept: addedIngredient,
    collect: monitor => ({
      isHovered: monitor.isOver()
    }),
    drop(droppedItemId) {
      const droppedItem = { ...Object.values(availableIngredients).flat().find(item => item._id === droppedItemId.id) };
      if (droppedItem.type === 'bun') {
        if (droppedItem._id !== selectedBun._id) {
          dispatch({
            type: INCREASE_INGREDIENT_QUANTITY,
            id: droppedItem._id,
            increaseAmount: 2
          });
          Object.keys(selectedBun).length &&
            dispatch({
              type: DECREASE_INGREDIENT_QUANTITY,
              id: selectedBun._id,
              decreaseAmont: 2
            });
        }
      } else {
        dispatch({
          type: INCREASE_INGREDIENT_QUANTITY,
          id: droppedItem._id,
          increaseAmount: 1
        });
      }
      dispatch({
        type: ADD_CONSTRUCTOR_ITEM,
        data: droppedItem
      });
    }
  }, [availableIngredients, INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY, ADD_CONSTRUCTOR_ITEM, dispatch, selectedBun]);

  const handleModalClose = () => dispatch({ type: HIDE_ORDER_DETAILS });

  return (
    <>
      <section
        className={styles.section + (extraClass ? (' ' + extraClass) : '') + (isHovered ? (' ' + styles['hovered-section']) : '')}
        ref={dropTargetRef}
      >
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
                <DragableContainer
                  key={item.constructorId}
                  constructorId={item.constructorId}
                  index={index}
                >
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => closeHandler(item)}
                  />
                </DragableContainer>
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
          extraClass="ml-4 mr-4"
        />
      </section>
      {modalIsOpen && !sendingData && (
        <Modal closeHandler={handleModalClose}>
          {!failedToSend
            ? (<OrderDetails />)
            : (<OrderError />)
          }
        </Modal>
      )}
    </>
  )
}

BurgerConstructor.propTypes = {
  extraClass: PropTypes.string
};

export default BurgerConstructor;
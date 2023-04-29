import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DragableContainer from '../dragable-container/dragable-container';
import Checkout from '../checkout/checkout';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderError from '../order-error/order-error';
import { addConstructorItem, hideBunError, removeConstructorItem, resetConstructor } from '../../services/actions/burger-constructor';
import { increaseIngredientQuantity, decreaseIngredientQuantity, resetAllQuantities } from '../../services/actions/burger-ingredients';
import { hideOrderDetails } from '../../services/actions/order-details';
import { addedIngredient } from '../../utils/constants';
import Notification from '../notification/notification';
import { TIngredient, TIngredientsItemDragData } from '../../utils/types';

type TBurgerConstructor = {
  extraClass?: string;
};

const BurgerConstructor: FC<TBurgerConstructor> = ({ extraClass }) => {

  const { modalIsOpen, sendingData, failedToSend } = useSelector(state => ({
    modalIsOpen: state.orderDetails.showDetails,
    sendingData: state.orderDetails.sendingData,
    failedToSend: state.orderDetails.failedToSend
  }));

  const { bun, middle } = useSelector(state => state.burgerConstructor.data);

  const { availableIngredients, showBunError } = useSelector(state => ({
    availableIngredients: state.burgerIngredients.data,
    showBunError: state.burgerConstructor.showBunError
  }));

  const dispatch = useDispatch();

  const closeHandler = ({ constructorId, _id }: { constructorId: number, _id: string }) => {
    dispatch(removeConstructorItem(constructorId));
    dispatch(decreaseIngredientQuantity(_id, 1));
  };

  const [{ isHovered }, dropTargetRef] = useDrop<TIngredientsItemDragData, any, { isHovered: boolean }>({
    accept: addedIngredient,
    collect: monitor => ({
      isHovered: monitor.isOver()
    }),
    drop(droppedItemId) {
      const droppedItem = { ...Object.values(availableIngredients).flat().find(item => item._id === droppedItemId.id)} as TIngredient;
      if (droppedItem.type === 'bun') {
        if (!bun || (droppedItem._id !== bun._id)) {
          dispatch(increaseIngredientQuantity(droppedItem._id, 2));
          bun && dispatch(decreaseIngredientQuantity(bun._id, 2));
          showBunError && dispatch(hideBunError());
        }
      } else {
        dispatch(increaseIngredientQuantity(droppedItem._id, 1));
      }
      dispatch(addConstructorItem(droppedItem));
    }
  }, [availableIngredients, dispatch, bun, showBunError]);

  const handleModalClose = (): void => {
    dispatch(hideOrderDetails());
    if (!failedToSend) {
      dispatch(resetConstructor());
      dispatch(resetAllQuantities());
    };
  };

  return (
    <>
      <section
        className={styles.section + (extraClass ? (' ' + extraClass) : '') + (isHovered ? (' ' + styles['hovered-section']) : '')}
        ref={dropTargetRef}
      >
        {showBunError && (<Notification>Выберите булку для Вашего бургера</Notification>)}
        <div className={styles['ingredients-container'] + ' mt-25 mb-10'}>
          {bun && (
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
            {middle.map((item, index) => (
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
            ))}
          </div>
          {bun && (
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
};

export default BurgerConstructor;
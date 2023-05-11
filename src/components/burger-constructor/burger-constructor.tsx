import React, { FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { getIngredientById } from '../../utils/functions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DragableContainer from '../dragable-container/dragable-container';
import Checkout from '../checkout/checkout';
import Modal from '../modal/modal';
import OrderConfirmation from '../order-confirmation/order-confirmation';
import OrderError from '../order-error/order-error';
import { addConstructorItem, hideBunError, removeConstructorItem, resetConstructor } from '../../services/actions/burger-constructor';
import { increaseIngredientQuantity, decreaseIngredientQuantity, resetAllQuantities } from '../../services/actions/burger-ingredients';
import { hideLoader, hideOrderConfirmation } from '../../services/actions/order-confirmation';
import { addedIngredient } from '../../utils/constants';
import Notification from '../notification/notification';
import { TIngredient, TIngredientsItemDragData } from '../../utils/types';
import Loader from '../loader/loader';

type TBurgerConstructor = {
  extraClass?: string;
};

const BurgerConstructor: FC<TBurgerConstructor> = ({ extraClass }) => {

  const { modalIsOpen, showLoader, sendingData, failedToSend } = useSelector(state => ({
    modalIsOpen: state.OrderConfirmation.showDetails,
    showLoader: state.OrderConfirmation.showLoader,
    sendingData: state.OrderConfirmation.sendingData,
    failedToSend: state.OrderConfirmation.failedToSend
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
      const droppedItem = { ...getIngredientById(availableIngredients, droppedItemId.id) } as TIngredient;
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
    dispatch(hideOrderConfirmation());
    if (!failedToSend) {
      dispatch(resetConstructor());
      dispatch(resetAllQuantities());
    };
  };

  const handleLoaderClose = (): void => {
    dispatch(hideLoader());
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
      {showLoader && (<Modal closeHandler={handleLoaderClose}><Loader /></Modal>)}
      {modalIsOpen && !sendingData && (
        <Modal closeHandler={handleModalClose}>
          {!failedToSend
            ? (<OrderConfirmation />)
            : (<OrderError />)
          }
        </Modal>
      )}
    </>
  )
};

export default BurgerConstructor;
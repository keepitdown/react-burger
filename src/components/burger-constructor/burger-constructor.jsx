import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Checkout from '../checkout/checkout';

function BurgerConstructor({ selectedIngridients: {top, middle, bottom}, extraClass }) {



  return (
    <section className={styles.section + (extraClass ? (' ' + extraClass) : '')}>
      <div className={styles['ingridients-container'] + ' mt-25 mb-10'}>
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
      <Checkout ingridientsList={[top, ...middle, bottom]} extraClass="ml-4 mr-4"/>
    </section>
  )
}

export default BurgerConstructor;
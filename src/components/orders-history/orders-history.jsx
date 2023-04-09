import React, { useEffect } from 'react';
import styles from './orders-history.module.css';
import ProfileNav from '../profile-nav/profile-nav';
import ProfileLink from '../profile-link/profile-link';

function OrdersHistory() {

  return (
    <section className={styles.container + ' mt-30'}>
      <div className={styles.sidebar}>
        <ProfileNav>
          <ProfileLink link="/profile" end>Профиль</ProfileLink>
          <ProfileLink link="/profile/orders">История заказов</ProfileLink>
          <ProfileLink link="/">Выход</ProfileLink>
        </ProfileNav>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете просмотреть&nbsp;свою историю заказов</p>
      </div>
    </section >
  )
}

export default OrdersHistory;
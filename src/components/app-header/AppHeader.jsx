import React, {useState, useEffect} from 'react';
import styles from './AppHeader.module.css';
import NavBar from '../nav-bar/NavBar.jsx';
import NavItem from '../nav-item/NavItem.jsx';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {

  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles['logo-container']}>
        <a href="#" className={styles['logo-link']}>
          <Logo />
        </a>
      </div>
      <NavBar firstRightItem="3">
        <NavItem active icon={<BurgerIcon type="primary" />}>
          Конструктор
        </NavItem>
        <NavItem icon={<ListIcon type="secondary" />}>
          Лента заказов
        </NavItem>
        <NavItem icon={<ProfileIcon type="secondary" />}>
            Личный кабинет
        </NavItem>
      </NavBar>
    </header>
  )
}

export default AppHeader;
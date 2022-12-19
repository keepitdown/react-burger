import React, {useState, useEffect} from 'react';
import styles from './AppHeader.module.css';
import NavBar from '../nav-bar/NavBar.jsx';
import NavItem from '../nav-item/NavItem.jsx';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {

  return (
    <header className={styles.header + ' mt-4 mb-4'}>
      <NavBar position="left">
        <NavItem active icon={<BurgerIcon type="primary" />}>
          Конструктор
        </NavItem>
        <NavItem icon={<ListIcon type="secondary" />}>
          Лента заказов
        </NavItem>
      </NavBar>
      <Logo />
      <NavBar position="right">
        <NavItem icon={<ProfileIcon type="secondary" />}>
            Личный кабинет
        </NavItem>
      </NavBar>
    </header>
  )
}

export default AppHeader;
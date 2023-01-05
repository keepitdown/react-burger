import React from 'react';
import styles from './app-header.module.css';
import NavBar from '../nav-bar/nav-bar';
import NavItem from '../nav-item/nav-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles['logo-container']}>
        <a href="#" className={styles['logo-link']}>
          <Logo />
        </a>
      </div>
      <NavBar firstRightItem={3}>
        <NavItem active icon={<BurgerIcon type="primary" />} link='#'>
          Конструктор
        </NavItem>
        <NavItem icon={<ListIcon type="secondary" />} link='#'>
          Лента заказов
        </NavItem>
        <NavItem icon={<ProfileIcon type="secondary" />} link='#'>
            Личный кабинет
        </NavItem>
      </NavBar>
    </header>
  )
}

export default AppHeader;
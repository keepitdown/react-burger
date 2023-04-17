import React from 'react';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../nav-bar/nav-bar';
import NavItem from '../nav-item/nav-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

  const { pathname: currentPath, state: locationState } = useLocation();

  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles['logo-container']}>
        <Link to="/" className={styles['logo-link']}>
          <Logo />
        </Link>
      </div>
      <NavBar firstRightItem={3}>
        <NavItem
          active={currentPath === '/' || (currentPath.startsWith('/ingredients/') && locationState?.useModal)}
          icon={<BurgerIcon type={(currentPath === '/' || (currentPath.startsWith('/ingredients/') && locationState?.useModal)) ? 'primary' : 'secondary'} />}
          link='/'
        >
          Конструктор
        </NavItem>
        <NavItem
          active={currentPath.startsWith('/orders')}
          icon={<ListIcon type={currentPath.startsWith('/orders') ? 'primary' : 'secondary'} />}
          link='#'
        >
          Лента заказов
        </NavItem>
        <NavItem
          active={currentPath.startsWith('/profile')}
          icon={<ProfileIcon type={currentPath.startsWith('/profile') ? 'primary' : 'secondary'} />}
          link='/profile'
        >
          Личный кабинет
        </NavItem>
      </NavBar>
    </header>
  )
}

export default AppHeader;
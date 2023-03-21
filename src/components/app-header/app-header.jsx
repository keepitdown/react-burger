import React from 'react';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
import NavBar from '../nav-bar/nav-bar';
import NavItem from '../nav-item/nav-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader({ activeTab }) {

  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles['logo-container']}>
        <a href="#" className={styles['logo-link']}>
          <Logo />
        </a>
      </div>
      <NavBar firstRightItem={3}>
        <NavItem
          active={activeTab === 'constructor'}
          icon={<BurgerIcon type={activeTab === 'constructor' ? 'primary' : 'secondary'} />}
          link='/'
        >
          Конструктор
        </NavItem>
        <NavItem
          active={activeTab === 'orders'}
          icon={<ListIcon type={activeTab === 'orders' ? 'primary' : 'secondary'} />}
          link='#'
        >
          Лента заказов
        </NavItem>
        <NavItem
          active={activeTab === 'profile'}
          icon={<ProfileIcon type={activeTab === 'profile' ? 'primary' : 'secondary'} />}
          link='/profile'
        >
          Личный кабинет
        </NavItem>
      </NavBar>
    </header>
  )
}

AppHeader.propTypes = {
  activeTab: PropTypes.string
};

export default AppHeader;
import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../nav-bar/nav-bar';
import NavItem from '../nav-item/nav-item';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TLocationState } from '../../utils/types';

const AppHeader: FC = () => {

  const { pathname: currentPath, state: locationState }: {pathname: string, state: TLocationState} = useLocation();

  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <div className={styles['logo-container']}>
        <Link to="/" className={styles['logo-link']}>
          <Logo />
        </Link>
      </div>
      <NavBar firstRightItem={3}>
        <NavItem
          active={currentPath === '/' || (currentPath.startsWith('/ingredients/') && !!locationState?.background)}
          icon={<BurgerIcon type={(currentPath === '/' || (currentPath.startsWith('/ingredients/') && !!locationState?.background)) ? 'primary' : 'secondary'} />}
          link='/'
        >
          Конструктор
        </NavItem>
        <NavItem
          active={currentPath === '/feed' || (currentPath.startsWith('/feed')  && !!locationState?.background)}
          icon={<ListIcon type={(currentPath === '/feed' || (currentPath.startsWith('/feed')  && !!locationState?.background)) ? 'primary' : 'secondary'} />}
          link='/feed'
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
};

export default AppHeader;
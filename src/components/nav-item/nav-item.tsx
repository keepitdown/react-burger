import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './nav-item.module.css';

type TNavItem = {
  children?: string;
  icon: ReactNode;
  active?: boolean;
  link: string;
};

const NavItem: FC<TNavItem> = ({ children, icon, active, link }) => {

  return (
    <Link
      to={link}
      className={
        styles.link
        + ' pl-5 pr-5 pt-4 pb-4'
        + (active ? (' ' + styles['link-active']) : '')
      }
    >
      {icon}
      <span
        className={
          'text text_type_main-default'
          + (active ? '' : ' text_color_inactive ')
          + (icon ? ' ml-2' : '')
          + ' ' + styles['link-text']
        }
      >
        {children}
      </span>
    </Link>
  )
};

export default NavItem;
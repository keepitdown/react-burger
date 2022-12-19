import React, {useState, useEffect} from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './NavItem.module.css';

function NavItem({ children, icon, active }) {

  return (
    <a 
      href="#"
      target="_blank"
      className={
        styles.link
        + ' text text_type_main-default'
        + (active ? 'text_color_inactive' : '')
        + 'pl-5 pr-5 pt-4 pb-4'}
    >
      {icon}
      <span className={icon && 'ml-2'}>{children}</span>
    </a>
  )
}

export default NavItem;
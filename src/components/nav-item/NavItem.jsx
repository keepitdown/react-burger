import React, {useState, useEffect} from 'react';
import styles from './NavItem.module.css';

function NavItem({ children, icon, active }) {

  return (
    <a 
      href="#"
      className={styles.link + ' pl-5 pr-5 pt-4 pb-4'}
    >
      {icon}
      <span 
        className={
          'text text_type_main-default'
          + (active ? '' : ' text_color_inactive')
          + (icon ? ' ml-2' : '')
        }
      >
        {children}
      </span>
    </a>
  )
}

export default NavItem;
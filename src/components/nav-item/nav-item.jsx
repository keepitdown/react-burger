import React from 'react';
import PropTypes from 'prop-types';
import styles from './nav-item.module.css';

function NavItem({ children, icon, active, link }) {

  return (
    <a
      href={link}
      className={
        styles.link
        + ' pl-5 pr-5 pt-4 pb-4'
        + (active ? (' ' + styles['link-active']) : ' text_color_inactive ')
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
    </a>
  )
}

NavItem.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.element,
  active: PropTypes.bool,
  link: PropTypes.string.isRequired
};

export default NavItem;
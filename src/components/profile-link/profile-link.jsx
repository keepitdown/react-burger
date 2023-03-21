import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './profile-link.module.css';

function ProfileLink({ children, link, clickHandler }) {

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        styles.link
        + ' text text_type_main-medium'
        + (isActive ? (' ' + styles['link-active']) : ' text_color_inactive')
      }
    >
      {children}
    </NavLink>
  )
}

ProfileLink.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ProfileLink;
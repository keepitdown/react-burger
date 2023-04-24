import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-link.module.css';

type TProfileLink = {
  children: string;
  link: string;
  end?: boolean;
};

const ProfileLink: FC<TProfileLink> = ({ children, link, end }) => {

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        styles.link
        + ' text text_type_main-medium'
        + (isActive ? (' ' + styles['link-active']) : ' text_color_inactive')
      }
      end={end}
    >
      {children}
    </NavLink>
  )
};

export default ProfileLink;
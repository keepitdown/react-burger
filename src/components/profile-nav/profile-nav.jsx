import React from 'react';
import PropTypes from 'prop-types';
import styles from './profile-nav.module.css';

function ProfileNav({ children }) {

  return (
    <ul className={styles.list}>
      {
        children.map?.((item, index) => (
          <li key={index} className={styles['list-item']}>
            {item}
          </li>
        ))
        ?? (<li>{children}</li>)
      }
    </ul>
  )
}

ProfileNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default ProfileNav;
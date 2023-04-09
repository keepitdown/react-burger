import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './profile-nav-button.module.css';

function ProfileNavButton({ children, clickHandler }) {

  return (
    <button
      className={styles.button + ' text text_type_main-medium text_color_inactive'}
      type="button"
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}

ProfileNavButton.propTypes = {
  children: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default ProfileNavButton;
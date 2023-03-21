import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../profile-nav/profile-nav';
import ProfileLink from '../profile-link/profile-link';

function Profile() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const nameInputRef = useRef();
  const [nameInputIsLocked, setNameInputIsLocked] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (nameInputIsLocked) {
      setNameInputIsLocked(!nameInputIsLocked);
    }
    setTimeout(() => nameInputRef.current.focus(), 0)
  };

  const handleBlur = () => setNameInputIsLocked(true);

  return (
    <section className={styles.container + ' mt-30'}>
      <div className={styles.sidebar}>
        <ProfileNav>
          <ProfileLink link="/profile">Профиль</ProfileLink>
          <ProfileLink link="/profile/orders">История заказов</ProfileLink>
          <ProfileLink link="/">Выход</ProfileLink>
        </ProfileNav>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </div>
      <form>
        <Input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          ref={nameInputRef}
          disabled={nameInputIsLocked}
          icon="EditIcon"
          onIconClick={handleClick}
          onBlur={handleBlur}
          extraClass={styles['input-field'] + ' mb-6'}
        />
        <EmailInput
          name="email"
          placeholder="Логин"
          value={formData.email}
          onChange={handleChange}
          isIcon
          extraClass={styles['input-field'] + ' mb-6'}
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon="EditIcon"
          extraClass={styles['input-field']}
        />
      </form>
    </section >
  )
}

export default Profile;
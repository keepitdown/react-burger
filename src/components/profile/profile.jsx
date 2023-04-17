import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../profile-nav/profile-nav';
import ProfileLink from '../profile-link/profile-link';
import ProfileNavButton from '../profile-nav-button/profile-nav-button';
import { sendLogOurRequest } from '../../services/actions/auth';
import { SET_PROFILE_EDITED, editProfileData } from '../../services/actions/profile';

function Profile() {

  const dispatch = useDispatch();

  const initialFormData = { ...useSelector(state => state.profile.data), password: '' };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [formWasEdited, setFormWasEdited] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  const formRef = useRef();

  const nameInputRef = useRef();
  const [nameInputIsLocked, setNameInputIsLocked] = useState(true);

  const handleClick = () => {
    if (nameInputIsLocked) {
      setNameInputIsLocked(!nameInputIsLocked);
    }
    setTimeout(() => nameInputRef.current.focus(), 0)
  };

  const handleBlur = () => setNameInputIsLocked(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormIsValid(formRef.current.checkValidity());
    !formWasEdited && setFormWasEdited(true);
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setFormWasEdited(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileChanges = Object.keys(formData).reduce(
      (changes, fieldName) => (initialFormData[fieldName] !== formData[fieldName])
        ? { ...changes, [fieldName]: formData[fieldName] }
        : { ...changes }
      , {});

    dispatch(editProfileData(profileChanges));
  };

  const profileWasEdited = useSelector(state => state.profile.profileWasEdited);

  useEffect(() => {
    if (profileWasEdited) {
      setFormData({ ...initialFormData });
      setFormWasEdited(false);
      dispatch({
        type: SET_PROFILE_EDITED,
        status: false
      });
    }
  }, [profileWasEdited, initialFormData]);

  const handleLogOut = () => {
    dispatch(sendLogOurRequest());
  }

  return (
    <section className={styles.container + ' mt-30'}>
      <div className={styles.sidebar}>
        <ProfileNav>
          <ProfileLink link="/profile" end>Профиль</ProfileLink>
          <ProfileLink link="/profile/orders">История заказов</ProfileLink>
          <ProfileNavButton clickHandler={handleLogOut}>
            Выход
          </ProfileNavButton>
        </ProfileNav>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
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
          required
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
        {formWasEdited && (
          <div className={styles.buttons + ' mt-6'}>
            <button type="reset" className={styles['reset-button'] + ' text text_type_main-default'}>
              Отмена
            </button>
            <Button htmlType="submit" type="primary" size="medium" disabled={!formIsValid}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </section >
  )
}

export default Profile;
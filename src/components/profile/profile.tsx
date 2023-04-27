import React, { FC, useEffect, useState, useRef, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../profile-nav/profile-nav';
import ProfileLink from '../profile-link/profile-link';
import ProfileNavButton from '../profile-nav-button/profile-nav-button';
import { sendLogOurRequest } from '../../services/actions/auth';
import { SET_PROFILE_EDITED, editProfileData } from '../../services/actions/profile';
import { TProfile, TProfileChanges, TAuthData } from '../../utils/types';

const Profile: FC = () => {

  const dispatch = useDispatch();

  const initialFormData: TAuthData = { ...useSelector<any, TProfile>(state => state.profile.data), password: '' };

  const [formData, setFormData] = useState<TAuthData>({ ...initialFormData });
  const [formWasEdited, setFormWasEdited] = useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [nameInputIsLocked, setNameInputIsLocked] = useState<boolean>(true);

  const handleClick = (): void => {
    if (nameInputIsLocked) {
      setNameInputIsLocked(!nameInputIsLocked);
    }
    setTimeout(() => nameInputRef.current!.focus(), 0)
  };

  const handleBlur = (): void => setNameInputIsLocked(true);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    setFormIsValid(formRef.current!.checkValidity());
    !formWasEdited && setFormWasEdited(true);
  };

  const handleReset = (): void => {
    setFormData({ ...initialFormData });
    setFormWasEdited(false);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const profileChanges: TProfileChanges = Object.keys(formData).reduce<TProfileChanges>(
      (changes, fieldName) => (initialFormData[fieldName as keyof TAuthData] !== formData[fieldName as keyof TAuthData])
        ? { ...changes, [fieldName]: formData[fieldName  as keyof TAuthData] }
        : { ...changes }
      , {});

    dispatch<any>(editProfileData(profileChanges));
  };

  const profileWasEdited = useSelector<any, boolean>(state => state.profile.profileWasEdited);

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
    dispatch<any>(sendLogOurRequest());
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
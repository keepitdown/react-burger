import React, { FC, useEffect, useMemo, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import styles from './profile.module.css';
import { PasswordInput, Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editProfileData, setProfileEdited } from '../../services/actions/profile';
import { TProfileChanges, TAuthData } from '../../utils/types';
import ProfileLayout from '../profile-layout/profile-layout';

const Profile: FC = () => {

  const dispatch = useDispatch();

  const storedUserData = useSelector(state => state.profile.data);
  const initialFormData = useMemo<TAuthData>(() => (
    storedUserData ? { ...storedUserData, password: '' } : { name: '', email: '', password: '' }
  ), [storedUserData]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    setFormIsValid(formRef.current!.checkValidity());
    !formWasEdited && setFormWasEdited(true);
  };

  const handleReset = (): void => {
    setFormData({ ...initialFormData });
    setFormWasEdited(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const profileChanges: TProfileChanges = Object.keys(formData).reduce<TProfileChanges>(
      (changes, fieldName) => (initialFormData[fieldName as keyof TAuthData] !== formData[fieldName as keyof TAuthData])
        ? { ...changes, [fieldName]: formData[fieldName as keyof TAuthData] }
        : { ...changes }
      , {});

    dispatch(editProfileData(profileChanges));
  };

  const profileWasEdited = useSelector(state => state.profile.profileWasEdited);

  useEffect(() => {
    if (profileWasEdited) {
      setFormData({ ...initialFormData });
      setFormWasEdited(false);
      dispatch(setProfileEdited(false));
    }
  }, [profileWasEdited, initialFormData, dispatch]);

  return (
    <ProfileLayout>
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
    </ProfileLayout>
  )
}

export default Profile;
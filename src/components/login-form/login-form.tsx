import React, { FC, useState, useRef, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './login-form.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { SET_FORM_FAIL_STATUS, sendLogInRequest } from '../../services/actions/auth';
import { TLocationState, TSignInForm } from '../../utils/types';

const LoginForm: FC = () => {
  const [formData, setFormData] = useState<TSignInForm>({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const logInHasFaild = useSelector<any, boolean>(state => state.auth.forms.login.hasFailed);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();

  const { state: locationState }: { state: TLocationState } = useLocation();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    setFormIsValid(formRef.current!.checkValidity());
  };

  const handleFocus = (): void => {
    if (logInHasFaild) {
      dispatch({
        type: SET_FORM_FAIL_STATUS,
        form: 'login',
        status: false
      });
    }
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(sendLogInRequest(formData));
  };

  return (
    <FormContainer heading="Вход">
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <EmailInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          required
          extraClass="mb-6"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          required
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!formIsValid}
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive mb-4'}>
        <span>Вы — новый пользователь?</span>
        <Link
          to="/register"
          state={locationState?.originalPath && { originalPath: locationState.originalPath }}
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Забыли пароль?</span>
        <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </FormContainer>
  );
};

export default LoginForm;
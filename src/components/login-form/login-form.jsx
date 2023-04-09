import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styles from './login-form.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { SET_FORM_STATUS, sendLogInRequest } from '../../services/actions/auth';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const formRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_FORM_STATUS,
        form: 'logIn',
        status: false
      });
    };
  }, []);

  const formIsSubmitted = useSelector(state => state.auth.forms.logIn.isSubmitted)

  const { state: locationState } = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormIsValid(formRef.current.checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLogInRequest(formData));
  }

  if (formIsSubmitted) {
    return <Navigate to={locationState?.originalPath || '/'} replace />
  }

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
          required
          extraClass="mb-6"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
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
        <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Забыли пароль?</span>
        <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </FormContainer>
  )
}

export default LoginForm;
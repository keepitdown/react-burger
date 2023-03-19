import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-form.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer heading="Вход">
      <form className={styles.form}>
        <EmailInput
          name="email"
          value={formData.email}
          onChange={handleChange}
          extraClass="mb-6"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button + ' mb-20'}
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
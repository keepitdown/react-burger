import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './registration-form.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';

function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer heading="Регистрация">
      <form className={styles.form}>
        <Input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          extraClass="mb-6"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Уже зарегистрированы?</span>
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </FormContainer>
  )
}

export default RegistrationForm;
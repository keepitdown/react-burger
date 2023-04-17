import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './registration-form.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { sendSignUpRequest } from '../../services/actions/auth';

function RegistrationForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const formRef = useRef();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormIsValid(formRef.current.checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendSignUpRequest(formData));
  }

  return (
    <FormContainer heading="Регистрация">
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
          extraClass="mb-6"
        />
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
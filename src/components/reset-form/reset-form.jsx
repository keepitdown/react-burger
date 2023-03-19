import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-form.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';

function ResetForm() {
  const [formData, setFormData] = useState({ password: '', code: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer heading="Восстановление пароля">
      <form className={styles.form}>
        <PasswordInput
          name="password"
          placeholder="Введите новый пароль"
          value={formData.password}
          onChange={handleChange}
          extraClass="mb-6"
        />
           <Input
          name="code"
          placeholder="Введите код из письма"
          value={formData.code}
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button + ' mb-20'}
        >
          Сохранить
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Вспомнили пароль?</span>
        <Link to="/register" className={styles.link}>Войти</Link>
      </p>
    </FormContainer>
  )
}

export default ResetForm;
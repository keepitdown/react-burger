import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './recovery-form.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';

function RecoveryForm() {
  const [formData, setFormData] = useState({ email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <FormContainer heading="Восстановление пароля">
      <form className={styles.form}>
        <EmailInput
          name="email"
          placeholder="Укажите e-mail"
          value={formData.email}
          onChange={handleChange}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={styles.button + ' mb-20'}
        >
          Восстановить
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Вспомнили пароль?</span>
        <Link to="/register" className={styles.link}>Войти</Link>
      </p>
    </FormContainer>
  )
}

export default RecoveryForm;
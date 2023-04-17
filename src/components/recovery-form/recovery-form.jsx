import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './recovery-form.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { SET_FORM_STATUS, sendRecoverRequest } from '../../services/actions/auth';

function RecoveryForm() {
  const [formData, setFormData] = useState({ email: '' });
  const [formIsValid, setFormIsValid] = useState(false);

  const formRef = useRef();

  const dispatch = useDispatch();

  const formIsSubmitted = useSelector(state => state.auth.forms.recover.isSubmitted);

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_FORM_STATUS,
        form: 'recover',
        status: false
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormIsValid(formRef.current.checkValidity());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendRecoverRequest(formData));
  };

  if (formIsSubmitted) {
    return (<Navigate to='/reset-password' state={{ originalPath: '/forgot-password' }} />);
  }

  return (
    <FormContainer heading="Восстановление пароля">
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <EmailInput
          name="email"
          placeholder="Укажите e-mail"
          value={formData.email}
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
          Восстановить
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Вспомнили пароль?</span>
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </FormContainer>
  )
}

export default RecoveryForm;
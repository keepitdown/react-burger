import React, { FC, useState, useRef, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, Navigate } from 'react-router-dom';
import styles from './recovery-form.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { sendRecoverRequest, setFormSubmitStatus } from '../../services/actions/auth';
import { TRecoveryForm } from '../../utils/types';
import { recover } from '../../utils/constants';

const RecoveryForm: FC = () => {
  const [formData, setFormData] = useState<TRecoveryForm>({ email: '' });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();

  const formIsSubmitted = useSelector(state => state.auth.forms.recover.isSubmitted);

  useEffect(() => {
    return () => {
      dispatch(setFormSubmitStatus(recover, false));
    };
  }, [dispatch]);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    setFormIsValid(formRef.current!.checkValidity());
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
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
  );
};

export default RecoveryForm;
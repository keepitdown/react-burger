import React, { FC, useState, useEffect, useRef, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styles from './reset-form.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../form-container/form-container';
import { SET_FORM_FAIL_STATUS, SET_FORM_SUBMIT_STATUS, sendResetRequest } from '../../services/actions/auth';
import { TLocationState, TResetForm } from '../../utils/types';

const ResetForm: FC = () => {
  const [formData, setFormData] = useState<TResetForm>({ password: '', token: '' });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();

  const { formIsSubmitted, resetHasFailed } = useSelector<any, { formIsSubmitted: boolean, resetHasFailed: boolean }>(state => ({
    formIsSubmitted: state.auth.forms.reset.isSubmitted,
    resetHasFailed: state.auth.forms.reset.hasFailed
  }));

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_FORM_SUBMIT_STATUS,
        form: 'reset',
        status: false
      });
    };
  }, []);

  const { state: locationState }: { state: TLocationState } = useLocation();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    setFormIsValid(formRef.current!.checkValidity());
  };

  const handleFocus = () => {
    if (resetHasFailed) {
      dispatch({
        type: SET_FORM_FAIL_STATUS,
        form: 'reset',
        status: false
      });
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(sendResetRequest(formData));
  };

  if (locationState?.originalPath !== '/forgot-password') {
    return (<Navigate to='/forgot-password' replace />);
  }

  if (formIsSubmitted) {
    return (<Navigate to='/login' replace />);
  }

  return (
    <FormContainer heading="Восстановление пароля">
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <PasswordInput
          name="password"
          placeholder="Введите новый пароль"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          required
          extraClass="mb-6"
        />
        <Input
          name="token"
          placeholder="Введите код из письма"
          value={formData.token}
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
          extraClass={styles.button + ' mb-20'}
        >
          Сохранить
        </Button>
      </form>
      <p className={styles['other-action'] + ' text text_type_main-default text_color_inactive'}>
        <span>Вспомнили пароль?</span>
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </FormContainer>
  );
};

export default ResetForm;
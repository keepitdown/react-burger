import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Profile() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section>
      
    </section>
  )
}

export default Profile;
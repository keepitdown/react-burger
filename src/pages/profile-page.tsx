import React, { FC, useEffect } from 'react';
import Profile from '../components/profile/profile';
import { changePageTitle } from '../utils/functions';

const ProfilePage: FC = () => {

  useEffect(() => changePageTitle('Личный кабинет'), []);

  return (<Profile />);
};

export default ProfilePage;
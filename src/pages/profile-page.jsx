import React, { useEffect } from 'react';
import Profile from '../components/profile/profile';
import { changePageTitle } from '../utils/functions';

function ProfilePage() {

  useEffect(() => changePageTitle('Личный кабинет'), []);

  return (
    <>
      <Profile />
    </>
  )
}

export default ProfilePage;
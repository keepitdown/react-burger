import React, { useEffect } from 'react';
import AppHeader from '../components/app-header/app-header';
import AppMain from '../components/app-main/app-main';
import Profile from '../components/profile/profile';
import { changePageTitle } from '../utils/functions';

function ProfilePage() {

  useEffect(() => changePageTitle('Личный кабинет'), []);

  return (
    <>
      <AppHeader activeTab="profile"/>
      <AppMain>
        <Profile/>
      </AppMain>
    </>
  )
}

export default ProfilePage;
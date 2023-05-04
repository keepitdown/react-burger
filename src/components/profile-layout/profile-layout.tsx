import React, { FC, ReactNode } from 'react';
import { useDispatch } from '../../services/hooks';
import styles from './profile-layout.module.css';
import ProfileNav from '../profile-nav/profile-nav';
import ProfileLink from '../profile-link/profile-link';
import ProfileNavButton from '../profile-nav-button/profile-nav-button';
import { sendLogOurRequest } from '../../services/actions/auth';
import { useLocation } from 'react-router-dom';

type TProfileLayout = {
  children: ReactNode;
};

const ProfileLayout: FC<TProfileLayout> = ({ children }) => {

  const { pathname: currentPath } = useLocation();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(sendLogOurRequest());
  }

  return (
    <section className={styles.container + ' mt-30'}>
      <div className={styles.sidebar}>
        <ProfileNav>
          <ProfileLink link="/profile" end>Профиль</ProfileLink>
          <ProfileLink link="/profile/orders">История заказов</ProfileLink>
          <ProfileNavButton clickHandler={handleLogOut}>
            Выход
          </ProfileNavButton>
        </ProfileNav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          {(currentPath === '/profile') && (<>В этом разделе вы можете изменить&nbsp;свои персональные данные</>)}
          {(currentPath === '/profile/orders') && (<>В этом разделе вы можете просмотреть&nbsp;свою историю заказов</>)}
        </p>
      </div>
      {children}
    </section >
  )
}

export default ProfileLayout;
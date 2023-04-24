import React, { FC, ReactNode } from 'react';
import styles from './app-main.module.css';

type TAppMain = {
  children?: ReactNode;
};

const AppMain: FC<TAppMain> = ({ children }) => {

  return (
    <main className={styles.main + ' pt-1 pb-1'}>
      {children}
    </main>
  )
};

export default AppMain;
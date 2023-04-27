import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import Notification from '../notification/notification';

type TMainNotification = {
  children: string;
}

const MainNotification: FC<TMainNotification> = ({ children }) => {

  const mainRef = useRef(document.getElementById('app-main') as HTMLElement);

  return createPortal((
    <Notification>{children}</Notification>
  ), mainRef.current)
};

export default MainNotification;
import React, { FC, useEffect } from 'react';
import { changePageTitle } from '../utils/functions';
import OrderFeed from '../components/order-feed/order-feed';
import { useDispatch, useSelector } from '../services/hooks';
import MainNotification from '../components/main-notification/main-notification';
import Loader from '../components/loader/loader';
import { feedWsClose, feedWsStart } from '../services/actions/order-feed-ws';

const FeedPage: FC = () => {

  useEffect(() => changePageTitle('Лента заказов'), []);

  const { feedData, feedError } = useSelector(state => ({
    feedData: state.feedWs.feed,
    feedError: state.feedWs.error
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedWsStart());

    return () => {
      dispatch(feedWsClose());
    }
  }, [dispatch]);

  if (!feedData && !feedError) {
    return (<Loader>Загрузка</Loader>);
  }

  return (
    <>
      {feedData && (<OrderFeed />)}
      {feedError && (<MainNotification>Отсутствует соединение с сервером</MainNotification>)}
    </>
  );
};

export default FeedPage;
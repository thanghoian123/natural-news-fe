import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../redux/userSlice';
import { fetchChatSessions } from '../../redux/chatSlice';

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchChatSessions(user.id));
    }
  }, [user]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedLayout;

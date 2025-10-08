import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const user = useSelector((s: RootState) => s.auth.user);
  if (!user) {
    sessionStorage.setItem('redirect_after_login', window.location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children;
}
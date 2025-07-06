import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser, selectAuthLoading } from '../../services/slices/authSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyForUnauthenticated?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyForUnauthenticated = false,
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (isLoading) return;

    const redirectPath = location.state?.from || '/';

    if (!onlyForUnauthenticated && !user) {
      navigate('/login', { state: { from: location }, replace: true });
    } else if (onlyForUnauthenticated && user) {
      navigate(redirectPath, { replace: true });
    }
  }, [isLoading, user, navigate, location, onlyForUnauthenticated]);

  if (isLoading) {
    return <Preloader />;
  }

  const shouldRenderChildren =
    (onlyForUnauthenticated && !user) || (!onlyForUnauthenticated && user);

  return shouldRenderChildren ? children : null;
};

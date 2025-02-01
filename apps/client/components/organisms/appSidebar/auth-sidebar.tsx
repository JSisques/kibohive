'use client';

import { useAuth } from '@clerk/nextjs';
import AppSidebar from './app-sidebar';

const AuthSidebar = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return <AppSidebar />;
};

export default AuthSidebar;

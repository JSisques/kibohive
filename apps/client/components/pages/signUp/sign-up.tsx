'use client';

import { SignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SignUpPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/create-organization');
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  );
};

export default SignUpPage;

import React from 'react';

import { Redirect } from '@/auth/.'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase'

import { LoginFooter, LoginGreet } from '@/components/pages/login'

const LoginPage = () => {

  const [user] = useAuthState(auth)

  if (user) {
    return <Redirect path='/' />
  }

  return (
    <div className='flex flex-col w-screen h-screen '>

      <LoginGreet />

      <LoginFooter />
     
    </div>
  )
};

export default LoginPage

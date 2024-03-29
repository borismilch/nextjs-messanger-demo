import React from 'react';

import Image from 'next/image'

import {IUser} from '@/models/.';
import { dayts } from '@/lib/dayts' 

const WriteBodyPlaceholder: React.FC<{user: IUser, isHelp?:boolean}> = ({user, isHelp = false}) => {
  return (
    <div className='flex-col flex items-center h-[40vh]  justify-center p-5 mx-auto'>

    <div className={'mb-2 ' + (isHelp ? 'avatar_lg' : 'avatar_md')}>

      {user?.photoURL &&  <Image 
        src={user.photoURL}
        layout='fill'
        objectFit='cover'
        alt='dddd'
      />}

    </div>

    <h2 className='text-black font-medium text-xl'>
      { user.displayName}
    </h2>

    <h2 className='text-gray-700 font-medium text-lg'>
      { user.email}
    </h2>

    <h5 className='text-xs text-gray-500'>
      {isHelp ? 'Last visit: ' + dayts((+user?.lastVisit?.seconds || Date.now() / 1000) * 1000).fromNow() : 'Вы друзья на Facebook'}
    </h5> 

  </div>
  )
};

export default WriteBodyPlaceholder;

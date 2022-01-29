import React from 'react';

import { RoomSearch, RoomsItems } from '.'

import { GoDesktopDownload } from 'react-icons/go'
import RoomsHeader from './roomHeader/RoomsHeader';

import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { firestore, auth } from '@/lib/firebase'

import { collection, query, where } from 'firebase/firestore'
import IRoom from '@/models/chat/IRoom';

const ChatsBar = () => {

  const [user] = useAuthState(auth)

  const [rooms] = useCollection( query(collection(firestore, 'rooms'), where("members", 'array-contains', user?.uid || 'ddd  ')) )

  return (
    <div className='flex flex-col w-full border-r border-gray-300 drop-shadow max-w-[360px] p-3 pl-1 relative'>

      <RoomsHeader />
     
      <RoomSearch />

      <RoomsItems rooms={rooms?.docs?.map(item => ({ ...item.data(), id: item.id }) as IRoom)} />
    

      <div className='absolute left-0 bottom-0 p-1 w-full border-t border-gray-300'>

        <div className='gray_button'>

          <GoDesktopDownload />

          <p className='font-semibold text-sm'>
            Download App now
          </p>

        </div>

      </div>

    </div>
  )
};

export default ChatsBar;

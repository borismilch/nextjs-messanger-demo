import React from 'react';
import Image from 'next/image'

import { useToggle } from '@/hooks/.'
import IRoom from '@/models/chat/IRoom';

import { useDocument } from 'react-firebase-hooks/firestore';
import { firestore, auth } from '@/lib/firebase'
import { doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';

import { ChatItemOptions } from '..'

import { observer } from 'mobx-react-lite'
import { ChatStore } from '@/store/.'

const ChatItem: React.FC<{room: IRoom}> = ({room}) => {

  const [user] = useAuthState(auth)
  const nonUserId = room?.members?.find(item => item !== user.uid)

  const [penUser] = useDocument(doc(firestore, 'users', nonUserId || 'ddd'))
  const [open, changeOpen] = useToggle(false)

  const selectChat = () => {
    ChatStore.selectChat(room.id, penUser.id)
  }

  return (
    <div 
      onClick={selectChat.bind(null)}
      className='chatItem gap-2 group w-full relative active:scale-95 transition-all duration-200'
      onMouseLeave={changeOpen.bind(null, false)}
    >
     { (penUser && penUser.data()?.photoURL) && <div className='avatar_md overflow-visible'>

        <Image 
          src={penUser.data().photoURL}
          alt='ddd'
          layout='fill'
          objectFit='cover'
          className='rounded-full '
        />

        <div className={'rounded-full border   absolute bottom-1 right-0 p-[6px] transition-all duration-200 '
         + (penUser.data().isOnline ? 'bg-green-600 border-green-800' : 'bg-gray-400 border-gray-800' )} />

      </div>}

      <div className='flex flex-col relative'>

        <h4>{penUser?.data()?.displayName}</h4>

        <div className='text-xs text-gray-700 flex items-center gap-2'>

          <p className='truncate max-w-[150px] font-semibold'>{penUser?.data().isOnline ? 'Online' : 'offline'}</p>

        </div>

      </div>
      
      <div className='ml-auto'>
        <ChatItemOptions open={open} changeOpen={changeOpen} room={room} />
      </div>


    </div>
  )
};

export default observer(ChatItem);

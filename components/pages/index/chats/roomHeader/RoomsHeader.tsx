import React from 'react';

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { HiPencilAlt } from 'react-icons/hi'

import { MdVideocam } from 'react-icons/md'
import AppIcon from '@/components/icons';

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { RoomHeaderDropList } from '..'

import { useToggle } from '@/hooks/.'

import { SidebarStore } from '@/store/.'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase'

const ChatsHeader = () => {

  const [open, changeOpen] = useToggle(false)

  const [user] = useAuthState(auth)

  const toggleSidebar = () => {
    SidebarStore.changeOpen(!SidebarStore.open)
  }

  return (
    <div className='flex items-center w-full justify-between p-2 gap-3 bg-white'>

      <div className='flex items-center gap-2'>

      {user && <div className='avatar_sm drop-shadow-sm'>
        <Image 
          objectFit='cover'
          layout='fill'
          src={user.photoURL}
          alt='user avatar small'
        />
      </div>}

      <h2 className='text-2xl -mt-1 font-bold '>
        Чаты
      </h2>

      </div>

      <div className='flex items-center gap-3'>

        <div className='relative z-20'>

          <AppIcon 
            onclick={changeOpen.bind(null, !open)}
            Icon={ <BiDotsHorizontalRounded className='text-2xl'  />}
          />
          

         <div className= { 
            'transition-all duration-300 absolute ' + (open ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}>
           <RoomHeaderDropList onClose={changeOpen.bind(null, false)} /> 
         </div>

        </div>

        <AppIcon 
          Icon={ <MdVideocam className='text-2xl'  />}
        />

        <AppIcon 
          Icon={ <HiPencilAlt className='text-2xl'  />}
          
        />

      </div>

    </div>
  )
};

export default observer(ChatsHeader);

import React, { useEffect } from 'react';

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

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, serverTimestamp } from 'firebase/firestore'

import { createMessage } from '@/utils/helpers/createMessage'

import { firestore } from '@/lib/firebase'
import MessageService from '@/service/MessageService';
import { ITextMessage } from '@/models/.';
import VideoCallService from '@/service/VideoCallServise';

import { ResendMessageStore } from '@/store/.'

const ChatsHeader = () => {

  const [users] = useCollection(collection(firestore, 'users'))
  const [rooms] = useCollection(collection(firestore, 'rooms'))
  const [open, changeOpen] = useToggle(false)

  const [user] = useAuthState(auth)

  useEffect(() => {
    if (ResendMessageStore.message) {
      resendMessageWithPopup()
    }
  }, [ResendMessageStore.message])

  const toggleSidebar = () => {
    SidebarStore.changeOpen(!SidebarStore.open)
  }

  async function resendMessageWithPopup () {
    const [room] = VideoCallService.valideteUserInput(rooms, users,user)

    if (!room.data()) {
      alert('Wrong user!'); return 
    }

    await MessageService.createMessage({} as ITextMessage, room.id, 
      {...ResendMessageStore.message, createdAt: serverTimestamp() as any} )

    ResendMessageStore.setMessage(null)
  }

  const sendMessageWithPopup = async () => {
    const [room] = await VideoCallService.valideteUserInput(rooms, users,user)

    const message = prompt('enter message')
    const newMessage = createMessage(message, user)

    await MessageService.createMessage({} as ITextMessage, room.id, newMessage )
  }

  const sendVideoRequestWithPopup = async () => {
    const [room, penUser] = VideoCallService.valideteUserInput(rooms, users,user)

    console.log(room, penUser)

    if (!room.data() || !penUser.data()) {
      alert('Wrong user!'); return 
    }

    await VideoCallService.createVideoCall(user, {...penUser.data(), id: penUser.id}, room.id)
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
          onclick={sendVideoRequestWithPopup.bind(null)}
        />

        <AppIcon 
          Icon={ <HiPencilAlt className='text-2xl'  />}
          onclick={sendMessageWithPopup.bind(null)}
          
        />

      </div>

    </div>
  )
};

export default observer(ChatsHeader);

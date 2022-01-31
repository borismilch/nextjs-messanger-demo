import React from 'react';
import Image from 'next/image'

import AppIcon, {IoVideocam, BsTelephoneFill, HiDotsCircleHorizontal, BiDotsHorizontalRounded} from '@/icons/.'
import {IUser} from '@/models/.';

import { observer } from 'mobx-react-lite'
import { SidebarStore, ChatStore } from '@/store/.'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { VideoCallService } from '@/service/.'

import { HiMenu } from 'react-icons/hi'
import { useNavigation } from '@/hooks/.'
 
const ChattingHeader: React.FC<{user: IUser, isVideoCall: boolean}> = ({user, isVideoCall}) => {
  const [currentUser] = useAuthState(auth)
  const {pushRouter} = useNavigation()

  const toggleSidebar = () => {
    SidebarStore.changeOpen(!SidebarStore.open)
  }

  const createCall = async () => {
    const callId = await VideoCallService.createVideoCall(currentUser, user, ChatStore.selectedChatId)
    pushRouter('/' + callId)
  }

  return (
    <div className={'p-3  flex justify-between items-center z-30 bg-white border-b border-r border-gray-300 drop-shadow-sm '}>

      <div className='flex items-center gap-3'>
        
      <div className='flex lg:hidden'>
        <AppIcon 
          Icon={<HiMenu className="text-gray-700 text-xl " />}
          classes='p-2 bg-white'
          onclick={() => SidebarStore.changeOpen(!SidebarStore.open)}
        />

      </div>

        { user?.photoURL && <div className='avatar_sm brightness-100'>
          <Image 
            src={user?.photoURL}
            objectFit='cover'
            layout='fill'
            alt='dddd'
          />
        </div>}

        
        <div className='truncate'>
        <h2 className='text-lg flex-shrink max-w-[60px] sm:max-w-[100px] truncate hover:underline cursor-pointer font-semibold'>
          {user?.displayName}
        </h2>
        </div>
     
      </div>

      {!isVideoCall && <div className='flex items-center gap-3'>
        <AppIcon
          Icon={<IoVideocam className='text-2xl text-blue-600' />}
          classes='bg-white p-2'
          onclick={createCall.bind(null)}
          tooltip={['Video Call', ' tooltip-bottom']}
        />

        <AppIcon
          Icon={<BsTelephoneFill className='text-xl text-blue-600' />}
          classes='bg-white p-2'
          tooltip={['Phone Call', ' tooltip-bottom']}
          onclick={createCall.bind(null)}
        />

        <AppIcon
          onclick={toggleSidebar.bind(null)}
          Icon={SidebarStore.open ? 
          <HiDotsCircleHorizontal className='text-xl text-blue-600' /> 
            :  
          <BiDotsHorizontalRounded className='text-xl text-blue-600' />}
          classes='bg-white p-2'
        />

      </div>
}
    </div>
  )
};

export default observer(ChattingHeader);

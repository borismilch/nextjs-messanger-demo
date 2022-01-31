import React from 'react';

import { useNavigation } from '@/hooks/.'
import Image from 'next/image'

import { IVideoCallRequest } from '@/models/.'

import { VideoCallButton } from '.';
import { ImPhoneHangUp } from 'react-icons/im';
import { FaPhoneAlt } from 'react-icons/fa'

import { deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '@/lib/firebase'
import ChatStore from '@/store/ChatStore';
import { observer } from 'mobx-react-lite'

import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useTimer } from '@/hooks/.'
import { toHHMMSS } from '@/utils/helpers/tohhttmmss'

const CallRequest: React.FC<{request: IVideoCallRequest}> = ({request}) => {

  const { pushRouter } = useNavigation()
  const [user] = useAuthState(auth)

  const {seconds} = useTimer(true)

  const deleteRequest = async () => {
    const callRef = doc(firestore, 'rooms', ChatStore.selectedChatId, 'incomingCalls', request.id)

    await deleteDoc(callRef)
  }

  const answear = async () => {
    pushRouter('/' + request.callId)
    await deleteRequest()
  }

  return (
    <div className='bg-white flex gap-2 w-full p-4 border-b border-gray-300 border-r'>

    <div className='flex items-center gap-2 flex-grow'>

      <div className='avatar_sm relative overflow-hidden'>
        <Image 
          src={request.creatorImage}
          layout='fill'
          objectFit='cover'
        />

      </div>
      
      <div>
        <p className=' font-semibold'>{request.creatorName} is calling...</p>
      </div>

    </div>

    <div className='flex items-center gap-4'>

      <p className='text-gray-800 font-semibold text-sm'>
        {toHHMMSS(seconds)}
      </p>

      { user && !(request.creator === user.uid) && <div className='relative'>

        <VideoCallButton 
          Icon={<FaPhoneAlt className='text-white z-20 text-xl' />}
          classes='bg-green-600 hover:bg-red-700 bg-green-600 shadow-sm animate- '
          onClick={answear.bind(null)}
        />

        <span 
          className="animate-ping 
          absolute inline-flex 
          h-full w-full rounded-full 
          bg-emerald-400 opacity-75" 
        />

      </div>}

      <VideoCallButton 
        Icon={<ImPhoneHangUp className='text-white text-xl' />}
        classes='bg-red-600 hover:bg-red-700 bg-red-600 shadow-sm'
        onClick={deleteRequest.bind(null)}
      />


    </div>

    </div>
  )
}

export default observer(CallRequest)

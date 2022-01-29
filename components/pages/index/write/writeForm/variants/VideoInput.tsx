import React from 'react';

import { observer } from 'mobx-react-lite'
import { VideoStore, ChatStore } from '@/store/.'

import { MessageService } from '@/service/.'
import { createMessage } from '@/utils/helpers/createMessage'

import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import AppIcon from '@/icons/.'

import { IoIosSend } from 'react-icons/io'
import { ITextMessage, IVideoMessage } from '@/models/.';

import { SendVideo } from '..'  

const VideoInput: React.FC<{lastMessage: any}> = ({lastMessage}) => {

  const [user] = useAuthState(auth)

  const sendImages = () => {
    const message = createMessage({...VideoStore.video}, user, 'video')

    VideoStore.cleanVideo()

    if (!message.body.url) { return }

    MessageService.createMessage(lastMessage as ITextMessage, ChatStore.selectedChatId, message)
  }

  return (
    <div 
      className='flex items-center p-3 justify-center w-full px-5'>

      <SendVideo file={VideoStore.files[0]} />

    <button
      onClick={sendImages.bind(null)}
      className='disabled:opacity-40 ml-auto absolute right-3 transform translate-y-12'
      disabled={VideoStore.files.length < 1}
    >
      <AppIcon 
        Icon={<IoIosSend className='text-xl text-blue-600' />}
        tooltip={['Send', 'tooltip-bottom ']}
        classes='p-2 '

        onclick={sendImages.bind(null)}
      />
    </button>


    </div>
  )
};

export default observer(VideoInput);

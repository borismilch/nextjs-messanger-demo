import React from 'react';

import { observer } from 'mobx-react-lite'
import { MediaStore, ChatStore } from '@/store/.'

import { SendImage } from '..'
import { BiPlus } from 'react-icons/bi'

import { MessageService } from '@/service/.'
import { createMessage } from '@/utils/helpers/createMessage'

import { useFileStore } from '@/hooks/.'

import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import AppIcon from '@/icons/.'

import { IoIosSend } from 'react-icons/io'
import { ITextMessage } from '@/models/.';

const ImageInput: React.FC<{lastMessage: any}> = ({lastMessage}) => {

  const [user] = useAuthState(auth)

  const {fileRef, onFileChange, triggerInput} = useFileStore()

  const sendImages = () => {
    const message = createMessage(MediaStore.pictures.slice().map(item => ({...item})), user, 'image')

    MediaStore.cleanItems()

    if (!message.body.length) { return }

    MessageService.createMessage(lastMessage as ITextMessage, ChatStore.selectedChatId, message)
  }

  return (
    <div 
      className='flex items-center sendFormInput w-full px-5 bg-gray-200'>

      {
        MediaStore.files.map((file, idx) => (
          <SendImage idx={idx} file={file} />
        ))
      }

      <button
        onClick={triggerInput.bind(null)}
        className='add_button disabled:opacity-50'
        disabled={ MediaStore.files.length > 8 }
      >
        <BiPlus className='text-xl' />
      </button>

    <input type="file" onChange={onFileChange} hidden ref={fileRef} />

    <button
      onClick={sendImages.bind(null)}
      className='disabled:opacity-40 ml-auto'
      disabled={ MediaStore.files.length > MediaStore.pictures.length }
    >
      <AppIcon 
        Icon={<IoIosSend className='text-xl text-blue-600' />}
        tooltip={['Send', 'tooltip-top']}
        classes='p-2'

        onclick={sendImages.bind(null)}
      />
    </button>


    </div>
  )
};

export default observer(ImageInput);

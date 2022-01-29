import React from 'react';

import { observer } from 'mobx-react-lite'
import { DocumentStore, ChatStore } from '@/store/.'
import { BiPlus } from 'react-icons/bi'

import { MessageService } from '@/service/.'
import { createMessage } from '@/utils/helpers/createMessage'
import { SendDocument } from '..'

import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import AppIcon from '@/icons/.'

import { IoIosSend } from 'react-icons/io'
import { ITextMessage } from '@/models/.';

import { useRef } from 'react'

const DocumentInput: React.FC<{lastMessage: any}> = ({lastMessage}) => {

  const [user] = useAuthState(auth)

  const docRef = useRef<HTMLInputElement>(null)

  const onChange = () => {
    const file = docRef.current.files[0]

    if (file) {
      DocumentStore.addFile(file)
    }
  }

  const sendImages = () => {
    const message = createMessage(DocumentStore.documents.slice().map(item => ({...item})), user, 'document')

    DocumentStore.cleanItems()

    if (!message.body.length) { return }

    MessageService.createMessage(lastMessage as ITextMessage, ChatStore.selectedChatId, message)
  }

  return (
    <div 
      className='flex items-center sendFormInput w-full px-5 bg-gray-200'>

      {
        DocumentStore.files.slice().map((file, idx) => (
          <SendDocument idx={idx} file={file} />
        ))
      }

      <button
        onClick={() => docRef.current.click()}
        className='add_button disabled:opacity-50'
        disabled={ DocumentStore.files.length > 8 }
      >
        <BiPlus className='text-xl' />
      </button>

    <input type="file" onChange={onChange} ref={docRef}  hidden  />

    <button
      onClick={sendImages.bind(null)}
      className='disabled:opacity-40 ml-auto'
      disabled={ DocumentStore.files.length > DocumentStore.documents.length }
    >
      <AppIcon 
        Icon={<IoIosSend className='text-xl text-blue-500' />}
        tooltip={['Send', 'tooltip-top']}
        classes='p-2'

        onclick={sendImages.bind(null)}
      />
    </button>


    </div>
  )
};

export default observer(DocumentInput);
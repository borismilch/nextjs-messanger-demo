import React, { SyntheticEvent, useEffect, useState } from 'react';

import { WriteFormActions, WriteFormRespond } from '..'
import AppIcon, { IoMdClose } from '@/icons/.'

import { useInputValue } from '@/hooks/.'
import { auth, firestore } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { ITextMessage } from '@/models/.'
import { collection,  updateDoc, doc, query, orderBy, limit } from 'firebase/firestore'
import { createMessage } from '@/utils/helpers/createMessage'

import { ChatStore, ChangeMessageStore, MediaStore , VideoStore, DocumentStore, VoiceMessageStore, 
  RespondMessageStore} from '@/store/.'

import { ImageInput } from '@/components/pages/index/write/writeForm'

import { observer } from 'mobx-react-lite'
import { useCollection } from 'react-firebase-hooks/firestore'
import { FaSkullCrossbones } from 'react-icons/fa';

import { TextForm, VideoInput, DocumentInput, VoiceMessageInput } from '.'

import {MessageService} from '@/service/.'

const ChattingFooter = () => {

  const [value, bind, cleanValue, changeValue] = useInputValue()
  const [user] = useAuthState(auth)
  const [lastMessages] = useCollection(query(collection(firestore, 'rooms', ChatStore.selectedChatId, 'messages'), orderBy('createdAt', 'desc'), limit(1)))

  const [lastMessage, setLastMessage] = useState<ITextMessage>({} as ITextMessage)

  const sendMessage = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) { return }

    const message: ITextMessage = createMessage(value, user)
    cleanValue()

    if (ChangeMessageStore.message.body) {
      const updateMessageRef = doc(firestore, 'rooms', ChatStore.selectedChatId, 'messages', ChangeMessageStore.message.id)
      ChangeMessageStore.setMessage({} as ITextMessage)
      await updateDoc(updateMessageRef, {body:message.body})
    }
    else {
      await MessageService.updateOrCreateMessage(lastMessage, ChatStore.selectedChatId, user, value, 
        RespondMessageStore.message ? {...message, respond: RespondMessageStore.message.id } : message)
    }

    {RespondMessageStore.message && RespondMessageStore.setMessage(null)}
  }

  const sendSticker = async () => {
    const message: ITextMessage = createMessage('☠', user)
    await  MessageService.updateOrCreateMessage(lastMessage, ChatStore.selectedChatId, user, value, message )
  }

  useEffect(() => {
    if (lastMessages?.docs[0]) {
      setLastMessage({...lastMessages?.docs[0]?.data(), id: lastMessages?.docs[0].id } as ITextMessage)
    }
    
  }, [lastMessages])

  const cancelChangeMessage = () => {
    ChangeMessageStore.setMessage({} as ITextMessage)
    cleanValue()
  }

  useEffect(() => {
    if (ChangeMessageStore.message) {
      changeValue(ChangeMessageStore.message.body)
    }
  }, [ChangeMessageStore.message])

  return (
    <>
      {RespondMessageStore.message && <WriteFormRespond /> }
    <div  
      className='
      flex items-center w-full gap-3 p-3 drop-shadow border-t border-r border-gray-300'>

     { !ChangeMessageStore.message.body && !value && !MediaStore.files.length && !VideoStore.files.length && !VoiceMessageStore.isVoice && <WriteFormActions />}

     <div className='items-center gap-2 flex w-full'>
 

     { MediaStore.files.length > 0 ? <ImageInput lastMessage={lastMessage} /> :
      VideoStore.files[0] ? <VideoInput lastMessage={lastMessage}  /> :

      DocumentStore.files.length > 0 ? <DocumentInput lastMessage={lastMessage} /> :

      VoiceMessageStore.isVoice ? 
       <VoiceMessageInput lastMessage={lastMessage} /> :
      (
        <TextForm 
          bind={bind}
          changeValue={changeValue}
          sendMessage={sendMessage}
          value={value}
        />
      )
  
     }
      
      <div className='relative'>

        { !ChangeMessageStore.message.body && 
          <AppIcon 
            Icon={<FaSkullCrossbones className='text-xl text-blue-600' />}
            tooltip={['Sticker', 'tooltip-top']}
            classes='p-2'
            onclick={sendSticker.bind(null)}
          />
        } 

      </div>

      </div>

    

      {ChangeMessageStore.message.body && 
        <AppIcon 
          Icon={<IoMdClose className='text-xl text-blue-600' />}
          tooltip={['Cancel', 'tooltip-top -left-4']}
          classes='p-2'
          onclick={cancelChangeMessage.bind(null)}
        />
      }

      {VoiceMessageStore.isVoice && 
        <AppIcon 
          Icon={<IoMdClose className='text-xl text-blue-600' />}
          tooltip={['Cancel', 'tooltip-top -left-4']}
          classes='p-2'
          onclick={() => VoiceMessageStore.endVoiceRecord()}
        />
      }
      
    </div>

    </>
  )
};

export default observer(ChattingFooter);

import React from 'react';
import Image from 'next/image'

import { observer } from 'mobx-react-lite'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore'

import { dayts } from '@/lib/dayts'
import { auth, firestore } from '@/lib/firebase'
import { IMageMessage, ITextMessage } from '@/models/.'
import { ChatStore } from '@/store/.'

import { emojies } from '@/utils/mock/emojies';

import { TextMessageContent, ImageMessageContent, EmojiMessage, MessageActions, VoiceMessageContent, CallEndMessageContent} from '..'
import IReaction from '@/models/chat/IReaction';

import { Reactions, MessageRespond } from '..'
import { VideoMessage } from '../content';

import { DocuementMessageContent } from '../content'

const Message: React.FC<{message: ITextMessage | any}> = ({message}) => {

  const [user] = useAuthState(auth)

  const isUser = user.uid === message.userId
  const [reactions] = useCollection(collection(firestore, 'rooms', ChatStore.selectedChatId, 'messages', message.id, 'reactions'))
  const isEmoji = emojies.includes(message.body)
  const isImage = message.role === 'image'
  const isVideo = message.role === 'video'
  const isDocument = message.role === "document"
  const isVoice = message.role === 'voice'
  const isCallEnd = message.role === 'call-ended'
  
  return (

    <div className='flex group items-center group gap-3 p-2 relative '>
      {
       isUser && (
        <>
          <div className={'tooltip relative z-40 ml-auto' }>
            {dayts((message?.createdAt?.seconds || 1) * 1000).fromNow()}
          </div>

          <MessageActions 
            message={message} 
            reactions={reactions?.docs?.map(doc => ({...doc?.data(), id:doc.id} as IReaction))} 
            isUser 
          />

        </>
       )
      }
  
      <div className='flex items-start gap-3'>

        { !isUser && <div className='avatar_sm'>
        <Image 
          src={user?.photoURL}
          layout='fill'
          objectFit='cover'
          alt='fff'
        />
         </div>}

          <div className='flex flex-col items-end '>

          {message.respond && <MessageRespond messageId={message.respond} />}

           { isEmoji ?  
            <EmojiMessage message={message} /> : 

            isImage ? <ImageMessageContent message={message as IMageMessage} /> :

            isVideo ? <VideoMessage message={message} /> :

            isDocument ? <DocuementMessageContent message={message} /> :

            isCallEnd ? <CallEndMessageContent message={message} /> :

            isVoice ? <VoiceMessageContent message={message} /> :
            <TextMessageContent isUser={isUser} message={message} /> }

          {reactions?.docs.length > 0 &&  <Reactions 
            messageId={message.id}
            reactions={reactions?.docs?.map(doc => ({...doc?.data(), id:doc?.id} as IReaction))} 
          />}

         </div>

      </div>

      {
        !isUser && (
          <>
         
            <MessageActions 
              reactions={reactions?.docs.map(doc => ({...doc?.data(), id:doc.id} as IReaction))} 
              message={message} 
              isUser={false} 
            />

            <div className={'tooltip relative z-40 mr-auto' }>
            {dayts((message?.createdAt?.seconds || 1) * 1000).fromNow()}
          </div>

          </>
        )
      }

    </div>
  )
};

export default observer(Message);

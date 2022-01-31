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

const Message: React.FC<{message: ITextMessage | any , isVideoCall?:boolean}> = ({message, isVideoCall = false}) => {

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
        <div className='flex items-center ml-auto  justify-center'>

          <div className={'flex items-center w-0 md:w-auto flex-col-reverse gap-2 lg:gap-0 md:flex-row  absolute md:relative right-20 -bottom-12 md:right-0 md:bottom-0 '}
          
            style={{width: isVideoCall &&  0, position: isVideoCall ? 'absolute' : 'relative', right: isVideoCall && 120, alignItems:"center",
            bottom: -40, flexDirection: "column-reverse"
          }}
          >

         
          <div className={'tooltip relative z-40 lg:ml-auto' }>
            {dayts((message?.createdAt?.seconds || 1) * 1000).fromNow()}
          </div>

          <MessageActions 
            message={message} 
            reactions={reactions?.docs?.map(doc => ({...doc?.data(), id:doc.id} as IReaction))} 
            isUser 
          />

          </div>

        </div>
       )
      }
  
      <div className='flex items-start gap-3'>

        { !isUser && <div className='avatar_sm'>
        <Image 
          src={message.userImage}
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
          <div className='flex items-center mr-auto   flex-col-reverse gap-2 lg:gap-0 md:flex-row justify-center'>

           <div className={'flex items-center -bottom-5  left-20 md:left-0 md:bottom-0 md:w-auto absolute md:relative gap-1 ' + (isVideoCall && "w-0 absolute left-20 -bottom-12  flex-col-reverse gap-2 ")}>
         
            <MessageActions 
              reactions={reactions?.docs.map(doc => ({...doc?.data(), id:doc.id} as IReaction))} 
              message={message} 
              isUser={false} 
            />

           

            <div className={'tooltip relative z-40 mr-auto' }>
              {dayts((message?.createdAt?.seconds || 1) * 1000).fromNow()}
            </div>

          </div>
          </div>
        )
      }

    </div>
  )
};

export default observer(Message);

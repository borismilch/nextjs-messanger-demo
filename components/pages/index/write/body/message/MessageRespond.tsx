import React from 'react';
import Image from 'next/image'

import { observer } from 'mobx-react-lite'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase'
import { IMageMessage, ITextMessage } from '@/models/.'
import { emojies } from '@/utils/mock/emojies';

import { TextMessageContent, ImageMessageContent, EmojiMessage, VoiceMessageContent} from '..'
import { VideoMessage } from '../content';
import { DocuementMessageContent } from '../content'
import { firestore } from '@/lib/firebase'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

import { ChatStore } from '@/store/.'

import { doc } from 'firebase/firestore'

const MessageRespond: React.FC<{messageId: string}> = ({messageId}) => {

  const [message] = useDocumentDataOnce(doc(firestore, 'rooms', ChatStore.selectedChatId, 'messages', messageId))

  const [user] = useAuthState(auth)

  const isUser = user?.uid === message?.userId
  const isEmoji = emojies.includes(message?.body)
  const isImage = message?.role === 'image'
  const isVideo = message?.role === 'video'
  const isDocument = message?.role === "document"
  const isVoice = message?.role === 'voice'
  
  return (
    <div className='flex group items-center group rounded-xl drop-shadow-xl gap-3 p-2  opacity-60 mb-3 relative '>
  
     {message && <div className='flex items-start gap-3'>

        { !isUser && <div className='avatar_sm'>
        <Image 
          src={user?.photoURL}
          layout='fill'
          objectFit='cover'
          alt='fff'
        />
         </div>}

          <div className='flex flex-col items-end relative '>

           { isEmoji ?  
            <EmojiMessage message={message as ITextMessage} /> : 

            isImage ? <ImageMessageContent message={message as IMageMessage} /> :

            isVideo ? <VideoMessage message={message as any} /> :

            isDocument ? <DocuementMessageContent message={message as any} /> :

            isVoice ? <VoiceMessageContent message={message as any} /> :
            <TextMessageContent isUser={isUser} message={message as any} /> }

          <div className='flex items-center gap-3'>
              <p className='text-sm font-semibold truncate max-w-[120px] text-gray-700 transform right-0 absolute -bottom-2'>replyed by: {message.username}</p>
          </div>

        </div>

      </div>}

    </div>
  )
};

export default observer(MessageRespond);

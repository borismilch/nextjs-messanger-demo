import React from 'react';

import { WriteBodyPlaceholder } from '..';
import { Message, TimeMessage } from '.'

import { observer } from 'mobx-react-lite'
import {IUser, ITextMessage, ITimeMessage} from '@/models/.';

import { ChatStore } from '@/store/.'
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/lib/firebase'

import { useRef, useEffect } from 'react'

import { collection, query, orderBy } from 'firebase/firestore'

const WriteMesssages: React.FC<{user: IUser}> = ({user}) => {

  const [messages] = useCollection(query(collection(firestore, 'rooms', ChatStore.selectedChatId, 'messages'), orderBy('createdAt')))

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    chatRef.current.scrollBy({
      left: 0,
      top: 10000000,
      behavior: "smooth"
    })

  }, [messages])

  return (
    <div 
      ref={chatRef}
      className='flex flex-grow pb-4 overflow-y overflow-y-auto scrollbar-thin flex-col drop-shadow border-r border-gray-300'>

      { !messages?.docs?.length && <WriteBodyPlaceholder 
        user={user}
      />}

      {
        messages?.docs?.map(item => !(item.data().role === 'time') ?  (
          <Message
            key={item.id}
           message={{...item.data(), id: item.id} as ITextMessage} 
          />
        ) : <TimeMessage
              message={{...item.data(), id: item.id} as ITimeMessage}
              key={item.id}  
            />)
      }

    </div>
  )
};

export default observer(WriteMesssages);

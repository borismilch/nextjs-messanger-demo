import React from 'react';

import { IRoom } from '@/models/.'
import { ChatItem } from '.'

const ChatsItems: React.FC<{rooms: IRoom[]}> = ({rooms}) => {

  return(
    <div className='flex items-center flex-col px-2 py-4 overflow-y-auto h-full overflow-x-hidden scrollbar-none max-h-[600px]'>

      {
        rooms?.map((item: IRoom) => (

          <ChatItem 
            room={item}
            key={item.id}
          />

        ))
      }
      
    </div>
  )
};

export default ChatsItems;

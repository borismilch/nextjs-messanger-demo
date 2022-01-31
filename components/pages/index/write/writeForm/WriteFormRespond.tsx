import React from 'react';
import { RespondMessageStore } from '@/store/.'

import { observer } from 'mobx-react-lite'
import { IoMdClose } from '@/components/icons'

const WriteFormRespond = () => {
  return (
    <div className='respondBanner p-3 opacity-100 bg-opacity-70'>

      <p
        className='text-sm font-medium text-gray-700'>
          Respond on {RespondMessageStore.message.username}&apos;s message
      </p>

     <div className='flex items-center gap-2'>

     {
        RespondMessageStore.message.role === 'text' ? (
          <p className='text-gray-800 text-sm truncate max-w-[300px]'>
            {RespondMessageStore.message.body}
          </p>
        ) : <p>Some message...</p>
      }

      <p
        onClick={() => RespondMessageStore.setMessage(null)}
        className='text-2xl text-blue-500 cursor-pointer'>
          <IoMdClose  />
        </p>

     </div>

    </div>
  )
};

export default observer(WriteFormRespond);

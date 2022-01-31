import React from 'react';

import { IVideoEndMessage } from '@/models/.'
import { toHHMMSS } from '@/utils/helpers/tohhttmmss'
import AppIcon from '@/components/icons'

import { RiVideoChatFill } from 'react-icons/ri'

import { MdMissedVideoCall, MdVideoCall } from 'react-icons/md'

const CallEndMessageContent: React.FC<{message: IVideoEndMessage}> = ({message}) => {
  return (
    <div className='p-3 px-6 pl-3 bg-gray-100 rounded-2xl flex items-center gap-1'>

      {
        message.body.rejected ? (
          <AppIcon 
            Icon={ <MdMissedVideoCall className="text-3xl text-gray-800" />}
          />

        ) : (
          <AppIcon 
            Icon={ <RiVideoChatFill className="text-3xl text-gray-800" />}
          />
        )
      }

      <div className='flex flex-col'>

        <h4 className='text-sm text-gray-900 font-medium'>
          {message.body.rejected ? 'VideoCall' : "VideoChat"}
        </h4>

        <p className='text-xs text-gray-400'>
          {toHHMMSS(message.body.callLength)}
        </p>

      </div>
     
    </div>
  )
};

export default CallEndMessageContent;

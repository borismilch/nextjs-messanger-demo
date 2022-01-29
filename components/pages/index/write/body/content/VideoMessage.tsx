
import { IVideoMessage } from '@/models/.';
import React from 'react';

const VideoMessageContent: React.FC<{message: IVideoMessage}> = ({message}) => {
  return (
    <div className='relative w-[270px] h-[150px]'>

      <video 
        src={message.body.url} 
        className='w-full h-full mt=1 rounded-lg drop-shadow-md hover:brightness-90 transition-all duration-200' 
        controls
      />

    </div>
  )
};

export default VideoMessageContent;
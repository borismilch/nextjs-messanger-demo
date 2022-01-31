import React from 'react';

import { IMageMessage } from '@/models/.'

import { ImageWithLoader } from '.'

const ImageMessageContent: React.FC<{message: IMageMessage, isVideoCall?: boolean}> = ({message, isVideoCall}) => {
  return (

    <div className={'flex flex-wrap gap-1 mt-3  relative w-[230px] md:w-[260px] h-[180px] ' + (isVideoCall &&"w-[230px]")}>
      {
        message.body.slice(0, 4).map((image, idx) => (
          <ImageWithLoader 
            message={message} 
            idx={idx} 
            image={image} 
            key={image.id}
          />
        ))
      }
 
    </div>

  )
};

export default ImageMessageContent;

import { IVoiceMessage } from '@/models/.';
import React from 'react';

const AudioMessageContent: React.FC<{message: IVoiceMessage}> = ({message}) => {
  return (
    <div className='py-2 '>
      <audio className='message' src={message.body.url} controls></audio>
    </div>
  )
};

export default AudioMessageContent;

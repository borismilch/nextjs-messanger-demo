import { ITextMessage } from '@/models/.';
import React from 'react';

const EmojiMessage: React.FC<{message: ITextMessage}> = ({message}) => {
  return (
    <div className='flex p-3 py-2 '>

      <p className='text-4xl'>
        {message.body}
      </p>

    </div>
  )
};

export default EmojiMessage;

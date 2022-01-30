import React from 'react';

import { IVideoEndMessage } from '@/models/.'
import { toHHMMSS } from '@/utils/helpers/tohhttmmss'

const CallEndMessageContent: React.FC<{message: IVideoEndMessage}> = ({message}) => {
  return (
    <div className='p-3 bg-red-600 text-white rounded-lg drop-shadow-md'>
      {toHHMMSS(message.body.callLength)}
    </div>
  )
};

export default CallEndMessageContent;

import React from 'react';
import { ITextMessage } from '@/models/.'

import { useNavigation } from '@/hooks/.'

const CallRequstMessageContent: React.FC<{message: ITextMessage}> = ({message}) => {

  const { pushRouter }  = useNavigation()

  const answear = () => {
    pushRouter('/' + message.body)
  }

  return (
    <div className='p-3'>

      <button 
        onClick={answear.bind(null)}
        className='p-2 rounded-lg w-full bg-blue-600 active:scale-90 transition-all duration-200 hover:bg-blue-700 text-white font-semibold'>Answear</button>

    </div>
  )
}
export default CallRequstMessageContent;

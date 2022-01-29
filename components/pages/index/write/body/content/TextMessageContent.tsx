import { ITextMessage } from '@/models/.';
import { evaluateRound } from '@/utils/rounds';
import React from 'react';

const TextMessageContent: React.FC<{message: ITextMessage, isUser: boolean}> = ({message, isUser}) => {

  const round = evaluateRound(message.body.length, isUser)

  return (
    <div className={'group ' + (isUser ? 
      'users_message rounded-tr-md ' : 'friend_message rounded-tl-md ') + round}>

    <div className={"flex flex-col break-words " + (isUser && 'items-end')} >
      {message.body.split("_|_").map((item: string) => (
        <p className='break-words max-w-[466px]' key={item}>{item}</p>
      ))}
   </div>

   </div>
  )
};

export default TextMessageContent;

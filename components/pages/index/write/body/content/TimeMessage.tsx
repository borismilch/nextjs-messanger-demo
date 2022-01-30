import React from 'react';
import { dayts, calendarConfig } from '@/lib/dayts'
import { ITimeMessage } from '@/models/.';

const TimeMessage: React.FC<{message: ITimeMessage}> = ({message}) => {
  return (
    <div className='p-3 flex justify-center items-center w-full'>

      <p
         className='text-xs font-semibold text-gray-700'
      >{dayts().calendar(null, calendarConfig)}</p>

    </div>
  )
};

export default TimeMessage;

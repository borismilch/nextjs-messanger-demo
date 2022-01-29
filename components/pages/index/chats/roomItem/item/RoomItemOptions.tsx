import AppIcon from '@/components/icons';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const ChatItemOptions: React.FC<{open: boolean, changeOpen: (val: boolean) => void}> = ({open, changeOpen}) => {

  const ChatItemDropList = dynamic(() => import('../RoomsDropList'))

  return (
    <div className='z-20 flex flex-col items-center transition-all duration-300 opacity-0 group-hover:opacity-100'>

    <AppIcon 
      Icon={<BiDotsHorizontalRounded className='text-xl ' />}
      shadow
      onclick={changeOpen.bind(null, !open)}
    />

    <div className={'flex  right-2  flex-col absolute z-20 ' + (open ? 'opacity-100 visible' : 'opacity-0 hidden') }>

      <Suspense fallback={ <p>Loading...</p> }>
        
        <ChatItemDropList onClose={changeOpen.bind(null, false)} />

      </Suspense>
  
    </div>

  </div>
  )
};

export default ChatItemOptions;

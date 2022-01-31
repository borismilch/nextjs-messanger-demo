import React from 'react';
import Image from 'next/image' 

import { observer } from 'mobx-react-lite'
import { SidebarStore } from '@/store/.'

const HelpPlaceholder = () => {
  return (
    <div className='w-full flex h-screen items-center justify-center '>

      <div className='flex flex-col gap-2 justify-center items-center p-5  bg-white drop-shadow-lg '>

       <div className='relative w-[150px] h-[150px] overflow-hidden '>

        <Image 
          src={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png'}
          layout='fill'
          objectFit='contain'
        />

       </div>
       
        <div
          onClick={() => SidebarStore.changeOpen(true)}
           className='flex py-3 text-blue-500 text-3xl font-medium flex-col text-center'>
          Start communicate right now!
        </div>

      </div>

    </div>
  )
};

export default HelpPlaceholder;

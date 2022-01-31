import React from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import { SidebarStore } from '@/store/.'

import { useToggle } from '@/hooks/.'

import { VideoSidebarContent } from '.';
import AppIcon from '@/components/icons'

const VideoSidebar = () => {

  const [open, changeOpen] = useToggle(false)

  return (
    <>
    <div className={'videoSidebar z-50 ' + (open && "translate-x-0")}>

      <div 
        className={
          'flex flex-col w-full transition-all duration-300 h-screen bg-white ' 

        }>
        <VideoSidebarContent />

    
      </div>

      <div className='h-screen transform z-[100] -translate-x-14 md:-translate-x-0 sm:flex items-start p-2'>
        {open ? (
           <AppIcon 
           Icon={<FaArrowLeft className='text-white text-2xl' />}
           classes='bg-gray-800  hover:bg-gray-900'
           onclick={() => changeOpen(false)}
         />
        ) :
          (<AppIcon 
            Icon={<FaArrowRight className='text-white text-2xl' />}
            classes='bg-gray-800 hover:bg-gray-900'
            onclick={() => changeOpen(true)}
            />)
        }


      </div>

    </div>

   { open && <div className='over'></div>}

    </>
  )
};

export default observer(VideoSidebar);

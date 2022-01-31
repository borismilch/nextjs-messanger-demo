import React from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { observer } from 'mobx-react-lite'
import { SidebarStore } from '@/store/.'

import { useToggle } from '@/hooks/.'

import AppIcon from '@/components/icons'

const VideoSidebar = () => {

  const [open, changeOpen] = useToggle(false)

  return (
    <div className='flex items-center'>

      <div 
        className={
          'flex flex-col transition-all duration-300 h-screen bg-white p-3 ' 

        }>
        kdkdkddk
      </div>

      <div className='h-screen flex items-start p-2'>
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
  )
};

export default observer(VideoSidebar);

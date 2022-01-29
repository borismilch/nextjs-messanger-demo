import React from 'react';

import { useToggle } from '@/hooks/.'
import { BiChevronDown } from '@/icons/.'

const HelpMenu: React.FC = ({children}) => {

  const [open, changeOpen] = useToggle(false)

  return (
    <div className='flex flex-col '>

      <div 
        onClick={changeOpen.bind(null, !open)}
        className={'gray_button justify-between px-4 ' + (open && 'bg-gray-200 hover:bg-gray-200')}

      >
        <p className='text-sm font-medium'>Chat Settings</p>

        {<BiChevronDown className={'text-2xl text-gray-700 transition-all duration-300 transform ' + (open && 'rotate-[180deg]')} />}

      </div>

      { open && <div>
        {children}
      </div>}
    </div>
  )
};

export default HelpMenu;

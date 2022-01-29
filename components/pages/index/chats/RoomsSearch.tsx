import React from 'react';

import { BiSearchAlt2 } from 'react-icons/bi'

const ChatsSearch = () => {
  return (
    <div className='flex mt-4 items-center gap-1 mx-2 bg-gray-100 focus-visible:bg-gray-200 cursor-pointer transition-all duration-200 px-4 rounded-full'>

      <BiSearchAlt2 className='text-gray-600' />

      <input
        type="text"
        className='empty_input h-[35px]' 
        placeholder='Type something...'
      />

    </div>
  )
};

export default ChatsSearch;

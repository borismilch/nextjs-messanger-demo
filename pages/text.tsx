import React from 'react';
import { useNavigation } from '@/hooks/.';

const Text = () => {

  const { pushRouter } = useNavigation()

  return (
    <div className='p-2'>
      <button
        onClick={pushRouter.bind(null, '/')}
         className='bg-blue-500 text-white transition-all duration-200 hover:bg-blue-600 p-2 px-4 rounded-md '>
        back
      </button>
    </div>
  )
};

export default Text;

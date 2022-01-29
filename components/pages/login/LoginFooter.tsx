import React from 'react';

import { footerItems } from '@/utils/mock/footerContetn';

const LoginFooter = () => {
  return (
    <div className='flex items-center  justify-center w-full  flex-wrap p-3 py-4 drop-shadow-sm border-t border-gray-300'>

      <div className='flex items-center mx-auto flex-wrap justify-center max-w-[1100px] w-full gap-x-3 gap-y-1 '>

       {
         footerItems.map(item => (
           <span 
             key={item}
             className='text-black text-sm hover:underline'
            >
              {item}

           </span>
         ))
       }       

      </div>

    </div>
  )
};

export default LoginFooter;

import React from 'react';
import Image from 'next/image'

const AuthLogo = () => {
  return  (
    <div className='w-[75px] h-[75px] relative'>

      <Image 
        src={'https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg'}
        layout='fill'
        objectFit='cover'
        alt='fffff'
      />

    </div>
  )
 
};

export default AuthLogo;

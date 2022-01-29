import React from 'react';

const HelpMenuItem: React.FC<{Icon: any, text: string}> = ({Icon, text}) => {
  return (
    <div className='gray_button justify-start gap-4 px-4'>
      {Icon}

      <p className='text-sm font-medium'>{text}</p>
    </div>
  )
};

export default HelpMenuItem;

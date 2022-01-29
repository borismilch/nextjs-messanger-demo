import React from 'react';

import { IDropItem } from '@/models/.';

import { DropItem } from '.'

const DropList: React.FC<{dropItems: IDropItem[]}> = ({dropItems}) => {
  return (
    <div className='rounded-2xl drop-shadow-2xl bg-white p-1 gap-1 w-[210px]'>

      {
        dropItems.map(item => (
          <DropItem key={item.text} dropItem={item} />
        ))
      }

    </div>
  )
};

export default DropList;

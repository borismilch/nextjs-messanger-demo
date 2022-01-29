import IDropItem from '@/models/forms/IDropItem';
import React from 'react';

const DropItem: React.FC<{dropItem: IDropItem}> = ({dropItem: { onClick, Icon, text, divide }}) => {
  return (
    <div
      onClick={onClick.bind(null)}
      className={'gap-3 gray_button justify-start px-4 py-3 ' + ( divide && 'border-gray-400 border-b pb-5 mb-3 rounded-none ')}
    >

    {Icon}

    <p className='text-black text-sm font-medium'>{text}</p>

    </div>
  )
};

export default DropItem;

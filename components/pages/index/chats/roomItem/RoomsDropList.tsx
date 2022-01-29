import React from 'react';

import { DropList } from '@/components/forms/droplist';

import { IDropItem } from '@/models/.';

import { BsArchiveFill, BsTelephoneFill, IoVideocam, IoWarning, MdDelete } from '@/icons/export'

const ChatItemDropList: React.FC<{onClose: () => void}> = ({onClose}) => {

  const items: IDropItem[] = [
    {
      Icon: <BsTelephoneFill className='text-xl' />,
      divide: false,
      onClick: () => {},
      text: 'Phone call'
    },

    {
      Icon: <IoVideocam className='text-xl' />,
      divide: true,
      onClick: () => {},
      text: 'Video call'
    },

    {
      Icon: <MdDelete className='text-xl' />,
      divide: false,
      onClick: () => {},
      text: 'Delete this chat'
    },

    {
      Icon: <BsArchiveFill className='text-xl' />,
      divide: false,
      onClick: () => {},
      text: 'Archieve this chat'
    },

    {
      Icon: <IoWarning className='text-xl' />,
      divide: false,
      onClick: () => {},
      text: 'Report about issues'
    },
  ]

  return (
    <div onClick={onClose.bind(null)}>
      <DropList dropItems={items} />
    </div>
  )
};

export default ChatItemDropList;

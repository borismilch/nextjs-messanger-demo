import React from 'react';
import { DropList } from '@/components/forms/droplist';

import { IDropItem } from '@/models/.'

import { IoSettingsSharp, IoChatbubbles } from 'react-icons/io5'
import { MdMarkChatUnread } from 'react-icons/md'
import { BsArchiveFill } from 'react-icons/bs'
import { SiMessenger } from 'react-icons/si'
import { HiOutlineLogout } from 'react-icons/hi'

import { observer } from 'mobx-react-lite'

import { useNavigation } from '@/hooks/.'

import { auth } from '@/lib/firebase'

const ChatHeaderDropList: React.FC<{onClose: () => void}> = ({onClose}) => {

  const { pushRouter } = useNavigation()

  const logout = async () => {
    await auth.signOut()

    pushRouter('/login')
  }

  const items: IDropItem[] = [


    {
      Icon: <HiOutlineLogout className='text-xl' />,
      divide: false,
      onClick: () => logout(  ),
      text: 'Logout'
    },


  ] 

  return (
    <div onClick={onClose.bind(null)} className='bg-white z-40 '>
      <DropList dropItems={items} />
    </div>
  )
};

export default observer(ChatHeaderDropList);

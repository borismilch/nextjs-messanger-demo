import React from 'react';

import { DropList } from '@/components/forms/droplist';

import { IDropItem } from '@/models/.';

import {  BsTelephoneFill, IoVideocam,  MdDelete } from '@/icons/export'
import { VideoCallService } from '@/service/.'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/lib/firebase'
import IRoom from '@/models/chat/IRoom';

import { deleteDoc, doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import IUser from '@/models/userInterfaces/IUser';
import { ChatStore } from '@/store/.'
import { observer } from 'mobx-react-lite'

import { useNavigation } from '@/hooks/.'

const ChatItemDropList: React.FC<{onClose: () => void, room: IRoom}> = ({onClose, room}) => {

  const [currentUser] = useAuthState(auth)
  const [user] = useDocument(doc(firestore, 'users', room.members.find(item => item !== currentUser.uid)))

  const sendUser = {...user?.data(), uid: user?.id} as IUser

  const { pushRouter } = useNavigation()

  const createCall = async () => {
    const callId = await VideoCallService.createVideoCall(currentUser, sendUser, room.id)
    ChatStore.selectChat(room.id, sendUser.uid)
    pushRouter('/' + callId)
  }

  const deleteChat = async () => {
    const roomRef = doc(firestore, 'rooms', room.id)

    const confirmed = confirm('Are you sure?')

    if (!confirmed) { return }

    await deleteDoc(roomRef)
  }

  const items: IDropItem[] = [
    {
      Icon: <BsTelephoneFill className='text-xl' />,
      divide: false,
      onClick: createCall.bind(null),
      text: 'Phone call'
    },

    {
      Icon: <IoVideocam className='text-xl' />,
      divide: false,
      onClick: createCall.bind(null),
      text: 'Video call'
    },

    {
      Icon: <MdDelete className='text-xl' />,
      divide: false,
      onClick: deleteChat.bind(null),
      text: 'Delete this chat'
    },


  ]

  return (
    <div onClick={onClose.bind(null)}>
      <DropList dropItems={items} />
    </div>
  )
};

export default observer(ChatItemDropList);

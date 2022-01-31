import React from 'react';

import AppIcon, { RiShareForwardFill, FaRegSmile, MdDelete, HiPencil } from '@/components/icons'

import { IMessage, ITextMessage } from '@/models/.'
import { firestore, auth } from '@/lib/firebase'
import { doc, deleteDoc, addDoc, collection } from 'firebase/firestore'

import { observer } from 'mobx-react-lite'
import { ChatStore, ChangeMessageStore, RespondMessageStore, ResendMessageStore } from '@/store/.'
import { EmojiPicker } from '@/components/forms/emoji';
import { useToggle } from '@/hooks/.'

import { FaComments } from 'react-icons/fa'

import { useAuthState } from 'react-firebase-hooks/auth'
import IReaction from '@/models/chat/IReaction';

const MessageActions:React.FC<{isUser: boolean, message: IMessage, reactions: IReaction[]}> = ({isUser, message, reactions}) => {

  const [open, changeOpen] = useToggle(false)
  const [user] = useAuthState(auth)

  const deleteMessage = async () => {

    const confirmed = confirm('Delete this message?')

    if (!confirmed) { return }

    await deleteDoc(doc(firestore, 'rooms', ChatStore.selectedChatId, 'messages', message.id))
  }

  const updateMessage = () => {
    ChangeMessageStore.setMessage(message as ITextMessage)
  }

  const selectMessage = () => {
    RespondMessageStore.setMessage(message as ITextMessage)
  }

  const resendMessage = () => {
    ResendMessageStore.setMessage(message as ITextMessage)
  }
  const addReaction = async (react: string) => {
    const reaction = {
      body: react,
      userId: user.uid,
    }

    const exsistReaction = reactions?.find(item => item.body === react && item.userId === user.uid)

    if (exsistReaction) {
      await deleteDoc(doc(firestore, 'rooms', ChatStore.selectedChatId, 'messages', message.id, 'reactions', exsistReaction.id))
    }

    else {
      await addDoc(collection(firestore, 'rooms', ChatStore.selectedChatId, 'messages', message.id, 'reactions'), reaction)
    }

  }

  return (
    <div className={'flex gap-1 items-center transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible '}>

      { isUser && <AppIcon
        Icon={<MdDelete className=' text-gray-600' />}
        classes='p-1  bg-white z-30'
        onclick={deleteMessage.bind(null)}
      />}

      { isUser && <AppIcon
        onclick={updateMessage.bind(null)}
        Icon={<HiPencil className=' text-gray-600' />}
        classes='p-1  bg-white z-30'
      />}

      <AppIcon
        Icon={<RiShareForwardFill className=' text-gray-600' />}
        classes='p-1  bg-white'
        onclick={resendMessage.bind(null)}
      />

      { !(message.role === "call-ended") && <AppIcon
        Icon={<FaComments className=' text-gray-600' />}
        classes='p-1  bg-white'
        onclick={selectMessage.bind(null)}
      />}

     <div className='relative'>

      <AppIcon
        Icon={<FaRegSmile className=' text-gray-600' />}
        classes='p-1 bg-white'
        onclick={changeOpen.bind(null, !open)}
      />

      { open && 
       <div className='absolute transform -translate-x-10 z-20 md:-translate-x-44 -translate-y-24'>
        <EmojiPicker 
           changeValue={addReaction}
        />
       </div>
      }

     </div>

    </div>
  )
};

export default observer(MessageActions);

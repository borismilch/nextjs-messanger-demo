import React, { ChangeEvent } from 'react';

import { observer } from 'mobx-react-lite'
import { MediaStore, VideoStore, DocumentStore, VoiceMessageStore} from '@/store/.'

import { useRef } from 'react'

import AppIcon, { MdStickyNote2, IoImage } from '@/icons/.'

import { FaMicrophone } from 'react-icons/fa'

import { RiVideoUploadFill } from 'react-icons/ri'

const ChattingformActions = () => {

  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)
  const docRef = useRef<HTMLInputElement>(null)

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    if (file) {
      MediaStore.addFile(file)
    }
  }

  const changeVideoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    if (file) {
      VideoStore.addFile(file)
    }
  
  }

  const changeDocument = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    if (file) {
      DocumentStore.addFile(file)
    }
  }

  const triggerInput = () => {
    fileRef.current.click()
  }

  return (
    <div className='flex items-center'>

      <AppIcon 
        Icon={<FaMicrophone className='text-xl text-blue-600' />}
        classes='p-2 bg-white'
        onclick={() => VoiceMessageStore.startVoiceRecord()}
        tooltip={['voice message', 'tooltip-top -left-8']}
      />

      <AppIcon 
        Icon={<IoImage className='text-xl text-blue-600' />}
        classes='p-2 bg-white'
        tooltip={['Send Image', 'tooltip-top -left-6']}
        onclick={triggerInput.bind(null)}
      />

      <AppIcon 
        Icon={<MdStickyNote2 className='text-xl text-blue-600' />}
        classes='p-2 bg-white'
        tooltip={['Send Document', 'tooltip-top -left-8']}
        onclick={() => docRef.current.click()}
      />

      <AppIcon 
        Icon={<RiVideoUploadFill className='text-xl text-blue-600' />}
        classes='p-2 bg-white'
        onclick={() => { videoRef.current.click() }}
        tooltip={['Send Video', 'tooltip-top -left-4']}
      />

    <input type="file" ref={fileRef} hidden onChange={changeFile} />
    <input type="file" ref={videoRef} hidden onChange={changeVideoFile} />
    <input type="file" ref={docRef} hidden onChange={changeDocument} />

    </div>
  )
};

export default observer(ChattingformActions);

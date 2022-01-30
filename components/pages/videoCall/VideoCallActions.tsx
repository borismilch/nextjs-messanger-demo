import React from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { ImPhoneHangUp } from 'react-icons/im';
import { IoVideocam, IoVideocamOff } from 'react-icons/io5';
import { MdScreenShare, MdOutlineStopScreenShare } from 'react-icons/md';

import { VideoCallContextData, VideoCallContext } from '@/context/VideoCallContext';

import { useContext } from 'react'

import { VideoCallButton } from '.'

const VideoCallAvtions = () => {

  const {hangUpCall, webcamActive, toggleVideo, toggleAudio, activeMicro, toggleShareScreen, sharedScreen} = useContext<VideoCallContextData>(VideoCallContext)

  return (
    <div 
      className="
      left-0 right-0 gap-3 bottom-3 flex justify-center items-center absolute z-10 
    ">

    <VideoCallButton 
      Icon={<ImPhoneHangUp className='text-white text-xl' />}
      classes='bg-red-600 hover:bg-red-700 bg-red-600'
      onClick={hangUpCall.bind(null)}
    />

    <VideoCallButton 
      Icon={ webcamActive ?  
        <IoVideocam className='text-white text-xl' /> :
        <IoVideocamOff className='text-white text-xl' />
      }
      classes={'bg-gray-600 hover:bg-gray-700 ' + (!webcamActive && "bg-gray-500 hover:bg-gray-600")}
      onClick={toggleVideo}
    />
    <VideoCallButton 
      Icon={ activeMicro ?  
        <FaMicrophone className='text-white text-xl' /> :
        <FaMicrophoneSlash className='text-white text-xl' />
      }
      classes={'bg-gray-600 hover:bg-gray-700 ' + (!activeMicro && "bg-gray-500 hover:bg-gray-600")}
      onClick={toggleAudio}
    />
      <VideoCallButton 
      Icon={ sharedScreen ?  
        <MdOutlineStopScreenShare className='text-white text-xl' /> :
        <MdScreenShare className='text-white text-xl' />
      }
      classes={'bg-gray-600 hover:bg-gray-700 ' + (!sharedScreen && "bg-gray-500 hover:bg-gray-600")}
      onClick={toggleShareScreen}
    />
   
   </div>
  )
};

export default VideoCallAvtions;

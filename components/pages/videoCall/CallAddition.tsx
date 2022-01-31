import React from 'react';

import { FaExpandAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { VideoCallContext, VideoCallContextData } from '@/context/VideoCallContext'

import { ImShrink2 } from 'react-icons/im'

import { toHHMMSS } from '@/utils/helpers/tohhttmmss'
import { VideoCallButton } from '@/components/pages/videoCall/'

const CallAddition = () => {

  const { seconds, parentElementReF, setFullScreen, isFullscreen } = useContext<VideoCallContextData>(VideoCallContext)

  const toggleFullScreen = () => {
    if (isFullscreen) {
      setFullScreen(false)
      document.exitFullscreen()
    }
    else {
      setFullScreen(true)
      parentElementReF.current.requestFullscreen()
    }
  }

  return (
    <div className='flex items-center gap-4  '>

      <p className='text-white tex-sm font-semibold '>
        {toHHMMSS(seconds)}
      </p>

      <VideoCallButton 
        Icon={isFullscreen ? 
          <FaExpandAlt className={"text-2xl text-white"} /> 
          : <ImShrink2 className={"text-2xl text-white"} />}
        onClick={toggleFullScreen}
        classes='hover:bg-gray-800 transition-all duration-200'
      />

    </div>
  )
};

export default CallAddition;

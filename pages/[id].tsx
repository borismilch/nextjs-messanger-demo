import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite'
import { ITextMessage, IVideoCall } from '@/models/.'

import { VideoCallPlaceholder, VideoCallActions, VideoCallAddition, VideoSidebar } from '@/components/pages/videoCall'
import  useVideoChat from '@/hooks/useVideoChat'
import { firestore, auth } from '@/lib/firebase'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { createMessage } from '@/utils/helpers/createMessage'
import { MessageService } from '@/service/.'
import { VideoCallContext } from '../contexts';

import { SidebarStore, ChatStore } from '@/store/.'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useTimer } from '@/hooks/.'

const VideoCall: React.FC<{videoCall: IVideoCall}> = ({videoCall}) => {
  const [currentUser] = useAuthState(auth)
  const {seconds, startTimer, clearTimer} = useTimer()
  const mode = ( (ChatStore.currentUserId === (videoCall.creator)) ? 'create' : 'join')

  const {localRef, remoteRef, hangUp, webcamActive, setupSources, toggleVideo, toggleAudio, activeMicro, sharedScreen, toggleShareScreen} = useVideoChat(videoCall.id + '', mode )

  const [isFullscreen, setFullScreen] = useState<boolean>(false)
  const parentElementReF = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setupSources()
    startTimer()

    return () => clearTimer()

  }, [])

  const hangUpCall = async () => {
    await hangUp()

    const newMessage = createMessage({callLength: seconds, timeStamp: serverTimestamp(), rejected: false}, currentUser, 'call-ended')

    await MessageService.createMessage({} as ITextMessage, videoCall.roomId , newMessage ) 
  }

  const ContextData = {
    hangUpCall, 
    webcamActive,
    toggleVideo,
    seconds,
    toggleAudio,
    activeMicro,
    sharedScreen,
    toggleShareScreen,
    parentElementReF,
    isFullscreen, 
    setFullScreen
  }

  return (
    <VideoCallContext.Provider value={ContextData}  
    >
     <div 
        ref={parentElementReF}
        className="h-screen w-screen flex items-center justify-center ">
      <div className='video_me overflow-hidden'>
        
       <video
        ref={localRef}
        autoPlay
        playsInline

        className={" w-[200px] h-[150px]  md:w-[250px] md:h-[200px] rounded-[20px] transition-opacity duration-200 " + (!localRef?.current?.srcObject && 'opacity-0 absolute') }
        muted
      /> 
      
      
      </div>

        <div className='flex items-center h-full justify-center bg-black bg-opacity-95 inset-0 absolute'>

        <div className='flex h-screen relative  flex-grow'>

        <VideoSidebar />  
          
          <video 
             
            ref={remoteRef} 
            autoPlay 
            playsInline 
            className={"h-screen w-screen  transition-all opacity-100 duration-200 " + (!remoteRef.current?.srcObject && "opacity-0 absolute")  }
          />

          </div>

          <VideoCallActions />

          <div className='z-10 absolute top-2 right-2'>
            <VideoCallAddition />
          </div>

        </div>

      </div>

    </VideoCallContext.Provider>
  
  )
};

export default observer(VideoCall);

export async function getServerSideProps ({query}) {
  const call = await getDoc(doc(firestore, 'calls', query.id))

  const videoCall = {...call.data(), id: call.id, timeStamp: (call.data()?.timeStamp?.seconds || Date.now() / 1000)}



  return {
    props: { videoCall }
  }
}
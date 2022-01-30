import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'
import { ITextMessage, IVideoCall } from '@/models/.'

import { VideoCallPlaceholder, VideoCallActions } from '@/components/pages/videoCall'
import  useVideoChat from '@/hooks/useVideoChat'
import { firestore, auth } from '@/lib/firebase'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { createMessage } from '@/utils/helpers/createMessage'
import { MessageService } from '@/service/.'

import { VideoCallContext } from '../contexts';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useTimer } from '@/hooks/.'

const VideoCall: React.FC<{videoCall: IVideoCall}> = ({videoCall}) => {
  const [currentUser] = useAuthState(auth)
  const {seconds, startTimer, clearTimer} = useTimer()

  const mode = ( (currentUser.uid === (videoCall.creator)) ? 'create' : 'join')

  const {localRef, remoteRef, hangUp, webcamActive, setupSources, toggleVideo, toggleAudio, activeMicro, sharedScreen, toggleShareScreen} = useVideoChat(videoCall.id + '', mode )

  useEffect(() => {
    setupSources()
    startTimer()

    return () => clearTimer()

  }, [])

  const hangUpCall = async () => {
    await hangUp()

    const newMessage = createMessage({callLength: seconds, timeStamp: serverTimestamp()}, currentUser, 'call-ended')

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
    toggleShareScreen
  }

  return (
    <VideoCallContext.Provider value={ContextData}  
    >
     <div className="h-screen w-screen flex items-center justify-center ">
      <div className='video_me overflow-hidden'>
        
       <video
        ref={localRef}
        autoPlay
        playsInline

        className={" w-[250px] h-[200px] rounded-[20px] transition-opacity duration-200 " + (!localRef?.current?.srcObject && 'opacity-0 absolute') }
        muted
      /> 
      
       { !localRef?.current?.srcObject && <VideoCallPlaceholder userId={videoCall.to} big={false} />}
      

      </div>

        <div className='flex items-center h-full justify-center bg-black bg-opacity-95 inset-0 absolute'>

        <div className='flex h-screen relative  flex-grow'>
          
          (<video 
             
            ref={remoteRef} 
            autoPlay 
            playsInline 
            className={"h-screen w-screen  transition-all opacity-100 duration-200 " + (!remoteRef.current?.srcObject && "opacity-0 absolute")  }
          />) 

          { !remoteRef.current?.srcObject && <VideoCallPlaceholder userId={videoCall.creator} big /> }
 
          </div>

          <VideoCallActions />

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
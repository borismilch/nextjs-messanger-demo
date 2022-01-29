
import AppIcon from '@/components/icons/';
import { observer } from 'mobx-react-lite';
import { BsRecordCircle } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io'
import { useRecorder } from '@/hooks/.'
import { FaStop } from 'react-icons/fa'

import { toHHMMSS } from '@/utils/helpers/tohhttmmss'

import { MessageService } from '@/service/.' 
import { createMessage } from '@/utils/helpers/createMessage'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { serverTimestamp } from 'firebase/firestore'

import { ChatStore } from '@/store/.'

const VoiceMessageInput: React.FC<{lastMessage: any}> = ({lastMessage}) => {

  const [user] = useAuthState(auth)

  const [audioURL, isRecording, startRecording, stopRecording, url, loading, timeStamp, audio, stopped] = useRecorder();

  const sendAudioMessage = async () => {
    const newMessage = createMessage({url, id:serverTimestamp()}, user, 'voice')

    console.log(newMessage)

    await MessageService.createMessage(lastMessage, ChatStore.selectedChatId, newMessage)
  }
  
  return (
    <div style={{background: 'rgb(59, 130, 246)'}}  className='sendFormInput bg-blue-500 hover:bg-blue-500 text-white p-1 flex-grow'>

      <div className='relative'>
      
       { !stopped && (!isRecording ? 
         <AppIcon 
           Icon={<FaStop className='text-2xl text-white bg-blue-500 animate-pulse -left-10' />}
           tooltip={['Start Recording', 'tooltip-top -left-10']}
           classes='p-1 bg-blue-500 hover:bg-blue-500' 
           onclick={startRecording.bind(null)}
         /> : (
          <AppIcon 
            Icon={<BsRecordCircle className='text-2xl text-white bg-blue-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-blue-500 hover:bg-blue-500' 
            onclick={stopRecording.bind(null)}
          /> 
         ))
       }

      { stopped && (
        <audio className='timeline ' controls src={audioURL}></audio>
      ) }

      </div>

      <div className='flex flex-grow w-full'>

      </div>

      {stopped  &&(

        <button disabled={loading} className='disabled:opacity-50'>

          <AppIcon 
            Icon={<IoIosSend className='text-2xl ml-auto text-white bg-blue-500 animate-pulse -left-10' />}
            tooltip={['End Recording', 'tooltip-top -left-10']}
            classes='p-1 bg-blue-500 hover:bg-blue-500  ml-auto' 
            onclick={sendAudioMessage.bind(null)}
          />

        </button> 
     
     )}


      <div className='text-blue-500  p-1 px-2 rounded-full animate-pulse  text-xs font-semibold bg-white'>
       {toHHMMSS(timeStamp)}
      </div>

    </div>
  )
};

export default observer(VoiceMessageInput);

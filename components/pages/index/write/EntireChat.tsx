import React from 'react';

import { WriteBody, WriteForm, WiriteHeader } from '.'

import { firestore } from '@/lib/firebase'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { doc, collection } from 'firebase/firestore'
import IUser from '@/models/userInterfaces/IUser';
import { Slider } from '../slider';
import { observer } from 'mobx-react-lite';
import { SliderStore, ChatStore } from '@/store/.'

import { VideoCallRequest } from '@/components/pages/videoCall'
import { IVideoCallRequest } from '@/models/.';

const EntireChat: React.FC<{isVideoCall?: boolean}> = ({isVideoCall}) => {

  const [user] = useDocument(doc(firestore, 'users', ChatStore.selectedUserId))

  const [requests] = useCollection(collection(firestore, 'rooms', ChatStore.selectedChatId, 'incomingCalls'))

  return (
    <div className='flex flex-col relative flex-grow'>

     { requests?.docs.length ?
       requests.docs.map(item => (
        <>
         { !isVideoCall &&
        <VideoCallRequest
           key={item.id} 
           request={{...item.data(), id: item.id} as IVideoCallRequest} 
         /> }
         </>
       )) :
       <>{ !isVideoCall && 
        <WiriteHeader 
          isVideoCall={isVideoCall} 
          user={{...user?.data(), uid: user?.id} as IUser} 
        />} </>
     }

      <WriteBody isVideoCall={isVideoCall} user={{...user?.data(), uid: user?.id} as IUser} />

    {!isVideoCall &&  <WriteForm  />}

      { SliderStore.slides.length > 0 && <Slider /> }

    </div>
  )
};

export default observer(EntireChat);

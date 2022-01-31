import React from 'react';
import { EntireChat, WriteForm } from '../../index/write';

import { WiriteHeader } from '../../index/write';
import { firestore } from '@/lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore';
import { observer } from 'mobx-react-lite'
import { ChatStore } from '@/store/.'
import { doc } from 'firebase/firestore'
import IUser from '@/models/userInterfaces/IUser';

const VideoSidebarContent = () => {

  const [user] = useDocument(doc(firestore, "users", ChatStore.selectedUserId))

  return (
    <>
   { user?.data() && <WiriteHeader user={{...user.data(), uid: user.id} as IUser } isVideoCall />}
    
    <div className='w-full max-w-screen overflow-x-hidden scrollbar-thin h-screen'>

        <EntireChat isVideoCall />

    </div>
    <WriteForm  />
    </>
  )
};

export default observer(VideoSidebarContent);

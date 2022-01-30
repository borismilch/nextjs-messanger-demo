import React from 'react';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore'

import { firestore } from '@/lib/firebase'
import { doc } from 'firebase/firestore'

import Image from 'next/image'

const VideoCallPlacehosder: React.FC<{userId: string, big: boolean}> = ({userId, big}) => {

  const [user] = useDocumentData(doc(firestore, 'users', userId))

  return (
    <div className='flex items-center justify-center w-screen flex-col gap-2'>

    <div className={' relative overflow-hidden ' + (big ? 'avatar_xl' : 'avatar_md')} >

      {user && 
       <Image 
        src={user.photoURL}
        layout='fill'
        objectFit='cover'
      />}

    </div>

    <h1 className={' text-white font-semibold ' + (big ? 'text-3xl' : "text-lg")}>
      {user?.displayName}
    </h1>
    </div>
  )
};

export default VideoCallPlacehosder;

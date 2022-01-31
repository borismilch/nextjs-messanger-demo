import React from 'react';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore'

import { firestore } from '@/lib/firebase'
import { doc } from 'firebase/firestore'

import Image from 'next/image'

const VideoCallPlacehosder: React.FC<{userId: string, big: boolean}> = ({userId, big}) => {

  const [user] = useDocumentData(doc(firestore, 'users', userId))

  return (
    <div className={'flex items-center bg-gray-900 drop-shadow-lg rounded-[20px] justify-center h-full z-10 flex-col gap-2 ' + (big && 'w-screen absolute bg-black ')}
      style={{backgroundColor: big ? '#181818' : "rgb(17, 24, 39)" }}
    >

    <div className={' relative overflow-hidden ' + (big ? 'avatar_xl' : 'avatar_lg')} >

      {user && 
       <Image 
        src={user.photoURL}
        layout='fill'
        objectFit='cover'
      />}

    </div>

    <h1 className={' text-white font-semibold ' + (big ? 'text-3xl' : "text-xl")}>
      {user?.displayName}
    </h1>
    </div>
  )
};

export default VideoCallPlacehosder;

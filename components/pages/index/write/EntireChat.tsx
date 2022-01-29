import React from 'react';

import { WriteBody, WriteForm, WiriteHeader } from '.'

import { firestore } from '@/lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore'
import { ChatStore } from '@/store/.'
import IUser from '@/models/userInterfaces/IUser';
import { Slider } from '../slider';
import { observer } from 'mobx-react-lite';
import { SliderStore } from '@/store/.'

const EntireChat = () => {

  const [user] = useDocument(doc(firestore, 'users', ChatStore.selectedUserId))

  return (
    <div className='flex flex-col relative flex-grow'>

      <WiriteHeader user={{...user?.data(), uid: user?.id} as IUser} />

      <WriteBody user={{...user?.data(), uid: user?.id} as IUser} />

      <WriteForm />

      { SliderStore.slides.length > 0 && <Slider /> }

    </div>
  )
};

export default observer(EntireChat);

import React from 'react';
import { WriteBodyPlaceholder } from '../write';

import { HelpMenu } from '.'
import { firestore } from '@/lib/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'

import { observer } from 'mobx-react-lite'
import { ChatStore } from '@/store/.'
import IUser from '@/models/userInterfaces/IUser';

const Help = () => {

  const [user] = useDocument(doc(firestore, 'users', ChatStore.selectedUserId || 'ss'))

  return (
    <div className='flex flex-col px-2 '>

      <WriteBodyPlaceholder 
        isHelp
        user={{...user?.data(), uid:user?.id} as IUser}
      />

      <HelpMenu >

      </HelpMenu>

      <HelpMenu />

    </div>
  )
};

export default observer(Help);

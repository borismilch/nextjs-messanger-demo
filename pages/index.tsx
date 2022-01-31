import Layout from '../components/Layout';

import { NextPage } from 'next';
import { observer } from 'mobx-react-lite'

import { RoomsBar } from '@/components/pages/index/chats';
import { EntireChat } from '@/components/pages/index/write';
import { Help, HelpPlaceholder } from '@/components/pages/index/help';

import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect } from '@/auth/.'

import { firestore, auth } from '@/lib/firebase'
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';

import {ChatStore} from '@/store/.'

const Home: NextPage = () => {

  const [user, loading] = useAuthState(auth)

  const setUserOnline = async (val: boolean) => {
    if (!user) return 
    await updateDoc(doc(collection(firestore, 'users'), user.uid), { isOnline: val, lastVisit: serverTimestamp() })
  }

  useEffect(() => {

    setUserOnline(true)

    return () => {
      setUserOnline(false)
    }

  }, [])

  useEffect(() => {
    if (user) {
      ChatStore.setCurrentUserId(user.uid)
    }
  }, [user])

  if (!user && !loading) { return <Redirect path='/login' /> }

  return (
    <Layout title='Some App'>
      
      <div className='h-screen w-screen flex'>
        <RoomsBar />

       { ChatStore.selectedChatId ? <EntireChat /> : <div className='flex flex-grow' />}

       { (ChatStore.selectedUserId) ? 
         <div 
           className='w-[400px] hidden xl:flex transition-all duration-200   flex-col'>
             
           <Help />

         </div> : <HelpPlaceholder />
       }

      </div>
         
    </Layout>
  );
}

export default observer(Home)

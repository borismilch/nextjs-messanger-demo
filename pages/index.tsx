import Layout from '../components/Layout';

import { NextPage } from 'next';
import { observer } from 'mobx-react-lite'

import { RoomsBar } from '@/components/pages/index/chats';
import { EntireChat } from '@/components/pages/index/write';
import { Help } from '@/components/pages/index/help';

import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect } from '@/auth/.'

import { firestore, auth } from '@/lib/firebase'
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';

import {ChatStore, SidebarStore} from '@/store/.'

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

  if (!user && !loading) { return <Redirect path='/login' /> }

  return (
    <Layout title='Some App'>
      
      <div className='h-screen w-screen flex'>
        <RoomsBar />

       { ChatStore.selectedChatId ? <EntireChat /> : <div className='flex flex-grow' />}

       { SidebarStore.open &&  
         <div 
           className='w-[400px] transition-all duration-200 hidden md:flex flex-col'>
             
           <Help />

        </div>
      }

      </div>
         
    </Layout>
  );
}

export default observer(Home)

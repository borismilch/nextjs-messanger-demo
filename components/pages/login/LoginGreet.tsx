import React from 'react';
import { AuthLogo } from '@/components/icons'

import { auth, googleProvider, firestore } from '@/lib/firebase'
import { signInWithPopup, User } from 'firebase/auth'

import { getDoc, doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'

import { useNavigation } from '@/hooks/.'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import {IUser, IRoom} from '@/models/.';

const LoginGreet = () => {

  const { pushRouter } = useNavigation()

  const [users] = useCollectionDataOnce(collection(firestore, 'users'))

  const signIn = async () => {
    signInWithPopup(auth, googleProvider)
     .catch(e => console.log(e))
     .then((result: any) => {checkUser(result.user.uid, result.user ), console.log(result.user); pushRouter('/')})
  }

  const checkUser = async (userId: string, payload: User) => {
    let user
         
    try {
      user = await getDoc(doc(firestore, 'users', userId))

      console.log(user.data())
      
    } catch {}

    if (user.data()) { return }

    const {displayName, email, photoURL, uid} = payload

    const newUser: IUser = {displayName, email, photoURL, uid, isOnline: true, lastVisit: serverTimestamp()}

    await setDoc(doc(firestore, 'users', uid), newUser)

    users?.forEach(async (user: IUser) => {

      const room: IRoom = {
        name: 'room',
        members: [user.uid, uid],
      }

      await addDoc(collection(firestore, 'rooms'), room)
    })

    console.log('bone')
  }


  return (
    <div className='flex w-screen flex-grow justify-center items-center px-[16px]'>

      <div className='max-w-[800px] items-center mx-auto w-full flex flex-col'>

        <div className='py-6'>
        <AuthLogo />
        </div>

        <h1 className='text-black text-center text-2xl md:text-[35px]'>
          Будьте на связи с важными для вас людьми.
        </h1>

        <button
          onClick={signIn}
          className='blue_button w-[260px] mt-[40px] mb-[50px]'>

          <span className='opacity-80'>
            Продолжить как <p className='font-semibold leading-5 text-sm opacity-100'>Google user</p>
          </span>

        </button>

        <span className='link'>
          Переключить аккаунт
        </span>

      </div>

    </div>
  )
};

export default LoginGreet;

import IUser from "@/models/userInterfaces/IUser"
import IVideoCall, { IVideoEndedCall } from "@/models/videoCall/IVideoCall"
import { createMessage } from "@/utils/helpers/createMessage"
import { ITextMessage } from "../models"

import { MessageService } from '.'
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, serverTimestamp } from "firebase/firestore"
import { firestore } from '@/lib/firebase'


class VideoCallService {
  static createCallObject (currentUser: IUser, user: IUser, chatId: string) {
    return { to: user.uid, timeStamp: serverTimestamp(), creator: currentUser.uid, offer: null, roomId: chatId, creatorImage: user.photoURL, creatorName: user.displayName}
  }

  static async createVideoCall (currentUser: IUser, user: IUser, chatId: string) {
    const callRef = collection(firestore, 'calls')
    const incomeRef = collection(firestore, 'rooms', chatId, 'incomingCalls')

    const callObject = this.createCallObject(currentUser, user, chatId)


    const newCall = await addDoc(callRef, callObject)
    const newReq =  await addDoc(incomeRef, {...callObject, callId: newCall.id})

    setTimeout(async () => await this.deleteCall(newCall.id, newReq.id, chatId, currentUser) , 30000)
  }

  static async deleteCall (callId: string, reqId: string, chatId: string, currentUser: IUser) {
    const call = await getDoc(doc(firestore, 'rooms', chatId, 'incomingCalls', reqId))
    
    if (call.data()) {
      await deleteDoc(doc(firestore, 'calls', callId))
      await deleteDoc(doc(firestore, 'rooms', chatId, 'incomingCalls', reqId))
  
      const newMessage: IVideoEndedCall = createMessage({
        rejected: true, timeStamp: serverTimestamp(), callLength: 0
      }, currentUser, 'call-ended')
      const messageRef = collection(firestore, 'rooms', chatId, 'messages')
  
      await addDoc(messageRef, newMessage)
    }

    
  }

  static valideteUserInput (rooms: any, users: any, user: IUser) {
    const username = prompt('Enter user name')

    const exists = users.docs.find(item => item.data().displayName === username || item.data().email === username)

    if (!exists) { alert('Wrong user!'); return [{data() {}},{data() {}}] }

    const room = rooms.docs.find((item: DocumentData) => item.data().members.includes(user.uid) && item.data().members.includes(exists.id))

    if (!room) { return [{data() {}},{data() {}} ] }

    return [room, exists]
  }


}

export default VideoCallService
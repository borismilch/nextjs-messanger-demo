import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { ITextMessage } from "../models"

import { emojies } from '@/utils/mock/emojies'

import { firestore } from '@/lib/firebase'
import IMessage from "@/models/chat/IMessage"
import IUser from "@/models/userInterfaces/IUser"

class MessageService {

  static async createMessage <T extends IMessage>(lastMessage: T, chatId: string, message: T) {

    const messageRef = collection(firestore, 'rooms', chatId, 'messages')

    if ((lastMessage?.createdAt?.seconds + 3600) < (Date.now() / 1000)) {
      const timeMessage = {
        role: 'time',
        createdAt: serverTimestamp()
      }

      await addDoc(collection(firestore, 'rooms', chatId, 'messages'), timeMessage)
    }

    await addDoc(messageRef, message)
  }

  static async updateOrCreateMessage <T extends ITextMessage>(lastMessage: T, chatId: string, user: IUser, value: string, message: T) {
    if ((lastMessage.userId === user.uid) && (lastMessage.createdAt?.seconds + 20) > (Date.now() / 1000) && !emojies.includes(lastMessage.body)) {

      await updateDoc(doc(firestore, 'rooms', chatId, 'messages', lastMessage.id), {body: lastMessage.body + ' _|_ ' + value})
    }
    else {
      await MessageService.createMessage(lastMessage, chatId, message)
    }
  }

  static async changeMessage
    <T extends ITextMessage> (selectedChatId: string, message: T, cb: (message: ITextMessage) => void) {
    const updateMessageRef = doc(firestore, 'rooms', selectedChatId, 'messages', message.id)
    cb({} as ITextMessage)
    await updateDoc(updateMessageRef, {body: message.body})
  }

}

export default MessageService
import {IUser, ITextMessage} from "@/models/.";
import { serverTimestamp } from 'firebase/firestore'

export const createMessage = (value:any, user: IUser, role = 'text') => {
  const message: any = {
    body: value,
    userImage: user.photoURL,
    username: user.displayName,
    createdAt: serverTimestamp() as any,
    userId: user.uid,
    role,
  }

  return message
}

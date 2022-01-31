import IMessage from '@/models/chat/IMessage'
import { makeAutoObservable } from 'mobx'
import { ITextMessage } from '../models'

class RespondMessageStore {

  message = null as null | ITextMessage
  
  constructor() {
    makeAutoObservable(this)
  }

  setMessage<T extends ITextMessage>(message: T) {
    this.message = message
  }
}

export default new RespondMessageStore()
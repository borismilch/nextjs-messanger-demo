import { makeAutoObservable } from 'mobx'
import { ITextMessage } from '../models'

class ResendMessageStore {

  message = null as ITextMessage | null

  constructor() {
    makeAutoObservable(this)
  }

  setMessage (message: ITextMessage | null) {
    this.message = message
  }
}

export default new ResendMessageStore()
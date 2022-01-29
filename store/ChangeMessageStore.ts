import { makeAutoObservable, observable } from 'mobx'

import { ITextMessage } from '@/models/.'

class ChangeMessageStore {

  message:ITextMessage = observable({} as ITextMessage)

  constructor () {
    makeAutoObservable(this)
  }

  setMessage(message:ITextMessage) {
    this.message = message
  }

}

export default new ChangeMessageStore()
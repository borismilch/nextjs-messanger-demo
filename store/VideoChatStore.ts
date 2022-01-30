import { makeAutoObservable } from 'mobx'

class VideoChatStore {

  currentVideoChat = '' as string

  constructor() {
    makeAutoObservable(this)
  }


  setCurrentVideoChat(chat: string) {
    this.currentVideoChat = chat
  }
}

export default new VideoChatStore()
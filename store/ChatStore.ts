import { makeAutoObservable } from 'mobx'

class ChatStore {

  selectedChatId: string = ''
  selectedUserId: string = ''
  currentUserId: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  selectChat(id: string, userId: string) {
    this.selectedChatId = id
    this.selectedUserId = userId
  }

  setCurrentUserId (uid: string) {
    this.currentUserId = uid 
  }

}

export default new ChatStore()
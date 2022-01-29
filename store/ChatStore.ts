import { makeAutoObservable } from 'mobx'

class ChatStore {

  selectedChatId: string = ''
  selectedUserId: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  selectChat(id: string, userId: string) {
    this.selectedChatId = id
    this.selectedUserId = userId
  }

}

export default new ChatStore()
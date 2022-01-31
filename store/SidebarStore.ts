import { makeAutoObservable } from 'mobx'

class SidebarStore {

  open: boolean = false
  chatOpen: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  changeOpen (val: boolean) {
    this.open = val
    console.log(val)
  }

  changeSidebarOpen (val: boolean) {
    this.chatOpen = val
  }

}

export default new SidebarStore()
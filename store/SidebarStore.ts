import { makeAutoObservable } from 'mobx'

class SidebarStore {

  open: boolean = true

  constructor () {
    makeAutoObservable(this)
  }

  changeOpen (val: boolean) {
    this.open = val
    console.log(val)
  }

}

export default new SidebarStore()
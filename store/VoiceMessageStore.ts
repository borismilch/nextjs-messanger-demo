import { makeAutoObservable } from 'mobx'

class VoiceMessage {

  isVoice = false as boolean

  constructor() {
    makeAutoObservable(this)
  }

  startVoiceRecord () {
    this.isVoice = true
  }

  endVoiceRecord () {
    this.isVoice = false
  }


  
}

export default new VoiceMessage()
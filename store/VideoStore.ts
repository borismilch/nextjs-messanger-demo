import { makeAutoObservable, observable } from 'mobx'

import { IVideo } from '@/models/.'

class VideoStore {
  
  files: File[] = observable([])
  video: IVideo = observable({} as IVideo)

  constructor() {
    makeAutoObservable(this)
  }

  addFile (file: File) {
    this.files.push(file)
  }

  addVideo (url: string) {
    const newVideo = {
      url,
      id: Date.now()
    }

    this.video = newVideo
  }

  removeVideo (idx: number)  {
    this.files = this.files.filter((item, i) => i !== idx)
    this.video = {} as IVideo
  }

  cleanVideo () {
    this.files = []
    this.video = {} as IVideo
  }

}

export default new VideoStore()

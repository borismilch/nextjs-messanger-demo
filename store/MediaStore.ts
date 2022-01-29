import { makeAutoObservable, observable } from 'mobx'

import { IPicture } from '@/models/.'

class MediaStore {

  files: File[] = observable([])
  pictures: IPicture[] = observable([]) 

  constructor() {
    makeAutoObservable(this)
  }

  addFile (file: File) {
    this.files.push(file)
  }

  addMedia (url: string) {

    const newPicture = {
      url,
      id: Date.now()
    }

    this.pictures.push(newPicture)
  }

  removeMedia (idx: number)  {
    this.files = this.files.filter((item, i) => i !== idx)
    this.pictures = this.pictures.filter((item, i) => i !== idx)
  }

  cleanItems () {
    this.files = []
    this.pictures = []
  }

}

export default new MediaStore()
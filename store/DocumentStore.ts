import { makeAutoObservable, observable } from 'mobx'

import { IDocument } from '@/models/.'

class DocumentStore {
    
  files: File[] = observable([])
  documents: IDocument[] = observable([]) 

  constructor() {
    makeAutoObservable(this)
  }

  addFile (file: File) {
    this.files.push(file)

    console.log('fileDocument', file)
  }

  addDocument (doc: IDocument) {
    this.documents.push(doc)

    
  }

  remove (idx: number)  {
    this.files = this.files.filter((item, i) => i !== idx)
    this.documents = this.documents.filter((item, i) => i !== idx)
  }

  cleanItems () {
    this.files = []
    this.documents = []
  }
}

export default new DocumentStore()

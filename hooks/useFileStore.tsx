
import { useRef } from 'react'

import { MediaStore } from '@/store/.'

const useFileStore = () => {

  const fileRef = useRef<HTMLInputElement>(null)

  const triggerInput = () => {
    fileRef.current.click()
  }

  const onFileChange = () => {
    const file = fileRef.current.files[0]

    if (file) {
      MediaStore.addFile(file)
    }
  }

  return {fileRef, triggerInput, onFileChange}
};

export default useFileStore;

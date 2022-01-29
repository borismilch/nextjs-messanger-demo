
import React, { useEffect } from 'react';
import { useUploadData } from '@/hooks/.'

import { ChatStore,DocumentStore } from '@/store/.'
import { observer } from 'mobx-react-lite';

import { DocExts, DocTypes } from '@/utils/mock/DocTypes'
import { GrDocument } from 'react-icons/gr'
import { SmallLoader } from '@/components/loaders'

const SendDocument: React.FC<{file: File, idx: number}> = ({file, idx}) => {

  const FileIcon = DocTypes[file.type] || GrDocument
  const extention = DocExts[file.type]

  const {getUploadedData, url, loading} = useUploadData('images/' + ChatStore.selectedChatId + "/", extention)

  useEffect(() => {
    console.log(file)
  }, [])

  useEffect(() => {
    getUploadedData(file)
  }, [])

  useEffect(() => {
    if (url) {
      const doc = {
        name: file.name,
        size: file.size,
        type: file.type,
        url  
      }
  
      DocumentStore.addDocument(doc)
    }
  }, [url])

  return (

    <div className='flex gap-2 items-center px-1 flex-shrink-0 relative rounded-md overflow-hidden pr-2'>

      {loading && <div className='inset-0 absolute bg-opacity-50 bg-gray-400 flex justify-end items-start' />}

      <div className='p-2 border border-gray-400 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer'>
        <FileIcon className={'text-2xl'} />  
      </div>

      <div className='flex '>

        <h2 className='text-lg font-medium max-w-[80px] truncate'>{file.name}</h2>

       { loading && <div className='ml-2'>
          <SmallLoader size={6} color='text-blue-600' />
        </div>}
        
      </div>

    </div>

  )
};

export default observer(SendDocument)
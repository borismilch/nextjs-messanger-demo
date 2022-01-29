import React from 'react';

import { useUploadData } from '@/hooks/.'
import { observer } from 'mobx-react-lite'
import { ChatStore, VideoStore } from '@/store/.' 
import { useEffect } from 'react';

import { SmallLoader } from '@/components/loaders'
import { useRef } from 'react'

const SendVideo: React.FC<{file: File}> = ({file}) => {

  const videoRef = useRef<HTMLInputElement>(null)

  const {getUploadedData, dataUrl, url, loading} = useUploadData('images/' + ChatStore.selectedChatId + "/")

  useEffect(() => {
    getUploadedData(file)
  }, [])

  useEffect(() => {
    if (url) {
      VideoStore.addVideo(url)
    }
  }, [url]) 

  return (
  
    <div className='ml-auto w-[530px] h-[300px] mx-auto group relative rounded-lg drop-shadow overflow-hidden '>

      {loading && <div className='inset-0 z-10 absolute bg-black bg-opacity-40 flex items-center h-full justify-center'>

          <SmallLoader />
       
      </div>}


      <div className='z-0'>
      { dataUrl && 

        <video 
          controls
          src={dataUrl}
          className='h-[300px]'
         
        />}
      </div>

      
    </div>
  )
};

export default observer(SendVideo);
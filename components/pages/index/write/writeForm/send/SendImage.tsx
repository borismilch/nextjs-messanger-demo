import React from 'react';

import { useUploadData } from '@/hooks/.'
import { observer } from 'mobx-react-lite'
import { ChatStore, MediaStore } from '@/store/.' 
import { useEffect } from 'react';

import { SmallLoader } from '@/components/loaders'
import { IoMdClose } from '@/components/icons'

const SendImage: React.FC<{file: File, idx: number}> = ({file, idx}) => {

  const {getUploadedData, dataUrl, url, loading} = useUploadData('images/' + ChatStore.selectedChatId + "/")

  useEffect(() => {
    getUploadedData(file)
  }, [])

  useEffect(() => {
    if (url) {
      MediaStore.addMedia(url)
    }
  }, [url]) 

  return (

    <div className='small_image'>

      {loading && <div className='inset-0 z-10 absolute bg-black bg-opacity-40 flex items-center h-full justify-center'>

          <SmallLoader size={6} />
       
      </div>}

      {!loading && <div className='small_overlay'>

        <button 
          onClick={() => MediaStore.removeMedia(idx)}
          className='round_button'>

          <IoMdClose 
            className="text-md font-medium"
          />

        </button>

      </div>}

      <div className='z-0'>
      { dataUrl && <img 
          src={dataUrl}
          className='w-full h-[100px] object-cover'
         
        />}
      </div>

      
    </div>
  )
};

export default observer(SendImage);
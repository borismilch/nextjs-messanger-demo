import React from 'react';

import Image from 'next/image'
import { observer } from 'mobx-react-lite'
import { SliderStore } from '@/store/.'
import { useImageLoader } from '@/hooks/.'

import { ImageInterface, IMageMessage } from '@/models/.'

const ImageWithLoader: React.FC<{image: ImageInterface, idx: number, message: IMageMessage}> = ({image, idx, message}) => {
  const length = message.body.length

  const sizeclass = (length < 2 ? 'w-full h-full' : length < 3 ?  'h-full' : '' )
  const [loaded, bind] = useImageLoader()

  const setSlides = () => {
    SliderStore.setSlides(message.body, idx)
  }

  return (
    
    <div 
      onClick={setSlides.bind(null)}
      key={image.id}
      className={' relative message_img ' + (sizeclass)}>

     {<img 
        {...bind}
        src={image.url}
        layout='fill'
        className={ 'cursor-pointer object-cover ' +  (!loaded && 'opacity-0 absolute invisible')}
      />}

    
   { !loaded && <div className={"sleleton z-40 " + (sizeclass)} /> }
      

   { 
      idx === 3 && message.body.length > 4 && 
      <div className='
        absolute bg-transparent inset-0 flex hover:opacity-60 items-center justify-center
      '>
        <p className='text-white text-2xl font-medium'>+{length - 4}</p>
      </div>
    }
    </div>
  )
};

export default observer(ImageWithLoader);

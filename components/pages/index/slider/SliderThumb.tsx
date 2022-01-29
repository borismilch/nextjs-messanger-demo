import React from 'react';

import { observer } from 'mobx-react-lite'
import { SliderStore } from '@/store/.'

import Image from 'next/image' 

const SliderThumb = () => {

  const selectImage = (idx: number) => {
    SliderStore.setSlides(SliderStore.slides, idx)

    console.log(idx)
  }

  return (
    <div className='flex items-center p-3 gap-2 justify-center'>

      {
        SliderStore.slides.map((slide, idx) => (
          <div className={
            'small_image relative brightness-[0.65] hover:brightness-90 cursor-pointer transition-all duration-200 ' + 
            (SliderStore.currentSlideImage === idx && 'brightness-[1.10]')
          }
            onClick={(e) => {e.stopPropagation(); selectImage(idx)}}
          >

            <Image 
              src={slide.url}
              layout='fill'
              objectFit='cover'
            />
          </div>
        ))
      }

    </div>
  )
};

export default observer(SliderThumb);

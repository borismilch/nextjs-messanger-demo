import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite'

import { SliderStore } from '@/store/.'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { ISlide } from '@/models/.';

import { SliderImage, SliderThumb } from '.'

const Slider = () => {

  const isShort = SliderStore.slides.length === 1

  const increment = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    SliderStore.incrementSlide()
  }

  const decrement = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    SliderStore.decrementSlide()
  }

  useEffect(() => {
    console.log('changed')
  }, [SliderStore.currentSlideImage, SliderStore.slides])

  return (

    <div
      onClick={() => SliderStore.clearData()}
       className='flex flex-col z-[1000] fixed inset-0 h-screen w-screen items-center justify-center max-w-screen bg-black bg-opacity-60'>

      <div className='flex items-center justify-center md:gap-4'> 

       { !isShort && <button
          disabled={SliderStore.currentSlideImage === 0}
          onClick={decrement.bind(null)}
          className='round_button absolute left-4 md:relative z-20'>
          <FiChevronLeft />
        </button>  }

        <div className='flex flex-col items-center'> 
          <div className='flex items-center justify-center'>
            {  
              SliderStore.slides.slice().map((slide: ISlide, idx: number) => (

                <div className='inline-block  max-w-screen  ' key={slide.url}>
                  <SliderImage slide={slide} idx={idx} />
                </div>

              ))
            }
          </div>

        </div>

       {!isShort && <button 
          disabled={SliderStore.currentSlideImage === SliderStore.slides.length - 1}
          onClick={increment.bind(null)}
          className='round_button absolute right-4 z-20 md:relative'>
          <FiChevronRight />
        </button>}

      </div>

      { SliderStore.isLoaded && <SliderThumb  />}

    </div>

 
  )
};

export default observer(Slider)
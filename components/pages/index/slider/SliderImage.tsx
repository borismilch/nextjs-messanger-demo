import React, { useEffect } from 'react';
import { useImageLoader } from '@/hooks/.'
import { ISlide } from '@/models/.';

import { observer } from 'mobx-react-lite'
import { SliderStore } from '@/store/.' 
import { SmallLoader } from '@/components/loaders/.'

const SliderImage: React.FC<{slide: ISlide, idx: number}> = ({slide, idx}) => {

  const [loaded, bind] = useImageLoader()

  useEffect(() => {
    if (loaded) { SliderStore.loadImages() }
  }, [loaded])

  return (
    <div className='md:w-auto w-[320px]  max-w-screen'>
    { !loaded && SliderStore.currentSlideImage === idx && <div className='w-[400px] h-full flex items-center justify-center'>
      <SmallLoader size={7} color='text-blue-500' />
    </div> }

      <div className={!loaded && 'opacity-0 absolute '}>

        {<img  
          {...bind}
          src={slide.url}
          className={'absolute opacity-0 md:w-auto w-[320px] max-h-[88vh] max-w-screen   ' + (SliderStore.currentSlideImage === idx && "relative opacity-100 visible")}
          style={{opacity: SliderStore.currentSlideImage === idx ? 1 : 0}}
        />}
      </div>

    </div>
  )
};

export default observer(SliderImage);

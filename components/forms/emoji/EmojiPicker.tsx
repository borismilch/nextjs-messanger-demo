import React from 'react';

import { emojies } from '@/utils/mock/emojies'
import { Emoji } from '.'

const EmojiPicker: React.FC<{changeValue: (val: string) => void}> = ({changeValue}) => {
  return (
    <div className=" scrollbar-none rounded-full bg-white grid grid-cols-5 w-[200px] h-[53px] border-2 border-transparent px-1 overflow-hidden  drop-shadow-lg ">
      
      {
        emojies.map(item => (
          <Emoji 
            key={item}
            val={item}
            onClick={changeValue.bind(null, item)}
          />
        ))
      }

    </div>
  )
};

export default EmojiPicker;
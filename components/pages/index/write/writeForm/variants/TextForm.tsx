import React, { SyntheticEvent } from 'react';

import { observer } from 'mobx-react-lite'
import { ChangeMessageStore } from '@/store/.'
import AppIcon from '@/components/icons/AppIcon';
import { FaSmile } from 'react-icons/fa';
import { EmojiPicker } from '@/components/forms/emoji';

import { useToggle } from '@/hooks/.'


interface TextFormProps {
  sendMessage: (e: SyntheticEvent<HTMLFormElement>) => void
  bind: Object,
  changeValue: (val: string) => void ,
  value: string
}

const TextForm: React.FC<TextFormProps> = ({sendMessage, bind, changeValue, value}) => {

  const [open, changeOpen] = useToggle(false)

  return (
    <form onSubmit={sendMessage.bind(null)} className='sendFormInput p-1 flex-grow'>

      <input
        type="text" 
        className='w-full empty_input h-[25px] transition-all duration-300' 
        placeholder='Aa'
        {...bind} 
      />

      <div className='relative'>
        {!ChangeMessageStore.message.body && 
            <AppIcon 
              Icon={<FaSmile className='text-xl text-blue-600' />}
              tooltip={['Like', 'tooltip-top']}
              classes='p-2'
              onclick={changeOpen.bind(null, !open )}
            />
          } 
        { open && <div className='absolute transform -translate-y-24 -left-28'>
              <EmojiPicker changeValue={(val: string ) => { val && changeValue( value + val)}} />
          </div>}
      </div>

    </form>
  )
};

export default observer(TextForm);

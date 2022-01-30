import React, { ReactElement } from 'react'

interface VideoCallButtonProps {
  Icon: ReactElement<any, any>, 
  disabled?: boolean, 
  onClick?: () => void,
  classes?: string
}

const VideoCallButton: React.FC<VideoCallButtonProps> = ({Icon, disabled, onClick, classes}) => {
  return(
    <button 
      onClick={ onClick && onClick.bind(null)}
      disabled={disabled} 
      className={'p-2 text-xl rounded-full  transition-all duration-200 active:scale-90 hover:opacity-80 cursor-pointer shadow-lg  ' + (classes)}
    >
      {Icon}
    </button>
  )
};

export default VideoCallButton;

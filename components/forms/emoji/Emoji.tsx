import React from 'react';

const Emoji: React.FC<{val: string, onClick: () => void}> = ({val, onClick}) => {
  return (
    <div onClick={onClick.bind(null)}>
      <p className='emoji'>
        {val}
      </p>
    </div>
  )
};

export default Emoji;
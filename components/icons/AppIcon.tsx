import React, { ReactElement } from 'react';

const AppIcon: React.FC<{Icon: ReactElement<null, null>, shadow?: boolean, onclick?: Function, tooltip?: [string, string], classes?: string }> = ({Icon, onclick = () => {}, shadow = false, tooltip, classes = ''}) => {

  return (
    <div
      onClick={onclick.bind(null)}
      className={ ' relative group z-10 ' +  (shadow ? 'shadowIcon ' : 'basic_icon ' ) + classes}
    >
      {Icon}

      {tooltip && <span className={tooltip[1]} >{tooltip[0]}</span>}
    </div>
  )
};

export default AppIcon;

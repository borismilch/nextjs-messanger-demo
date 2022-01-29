
import { observer } from 'mobx-react-lite'

import IReaction from '@/models/chat/IReaction';

const Reactions: React.FC<{messageId: string, reactions: IReaction[]}> = ({messageId, reactions}) => {

  return (
    <div className='rounded-full flex max-w-fit ml-auto transform -translate-y-1 items-center bg-white drop-shadow-md p-1'>

        <p className='text-xs font-medium px-1 text-blue-500'>{reactions.length}</p>

      {
        reactions.map(doc => (
          <p className='text-xs ' key={doc.id}>{doc.body}</p>
        ))
      }
    </div>
  )
};

export default observer(Reactions);

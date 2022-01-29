
import React from 'react';

import { DocumentMessage } from '.'
import { IDocumentMessage } from '@/models/.'

const DocumentMessageContent: React.FC<{message: IDocumentMessage}> = ({message}) => {
  return (
    <div className='flex flex-col mt-2'>
      {
        message.body.map(doc => (
          <DocumentMessage key={doc.url} document={doc} />
        ))
      }
    </div>
  )
};

export default DocumentMessageContent;
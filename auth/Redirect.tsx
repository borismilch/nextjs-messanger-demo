import React from 'react';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

const Redirect: React.FC<{path: string}> = ({path}) => {

  const router = useRouter()

  useEffect(() => {
    router.push(path)
    
  }, [])

  return <div></div>
};

export default Redirect;

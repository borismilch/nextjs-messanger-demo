import React from 'react';

import { useState, useRef } from 'react'

const useImageLoader = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const ref = useRef<HTMLImageElement>(null)

  const onLoad = () => {
    setTimeout(() => setLoaded(true), 1000)
  }

  const bind = {
    onLoad,
    ref
  }

  return [loaded, bind]
};

export default useImageLoader

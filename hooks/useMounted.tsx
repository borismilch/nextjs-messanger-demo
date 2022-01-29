import React from 'react';
import { useState, useEffect } from 'react'

const useMounted = (cb?: Function) => {

  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    cb && cb()
  }, [])

  return {mounted}
};

export default useMounted;

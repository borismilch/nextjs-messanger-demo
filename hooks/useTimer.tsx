import React from 'react';
import { useState, useEffect } from 'react'

const useTimer = (instant = false) => {

  const [seconds, setSeconds] = useState<number>(0)
  const [timer, setTimer] = useState(null)
  
  const startTimer = () => {
    setTimer(setInterval(() => setSeconds((prev: number) => prev + 1) ,1000))
  }

  const clearTimer = () => {
    clearInterval(timer)
  }

  instant && useEffect(() => {
    startTimer()

    return () => clearTimer()
  }, [])

  return {
    seconds,
    startTimer,
    clearTimer
  }
};

export default useTimer;

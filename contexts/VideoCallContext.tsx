import React, { createContext } from 'react'

export interface VideoCallContextData {
  hangUpCall: () => Promise<void>
  seconds: number 
  webcamActive: boolean 
  activeMicro: boolean
  toggleVideo: () => void
  toggleAudio: () => void
  toggleShareScreen: () => void, 
  sharedScreen: boolean
}

export const VideoCallContext = createContext<VideoCallContextData>({} as VideoCallContextData)

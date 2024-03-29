import React, { createContext, Dispatch, Ref, SetStateAction, RefObject } from 'react'

export interface VideoCallContextData {
  hangUpCall: () => Promise<void>
  seconds: number 
  webcamActive: boolean 
  activeMicro: boolean
  toggleVideo: () => void
  toggleAudio: () => void
  toggleShareScreen: () => void, 
  sharedScreen: boolean,
  parentElementReF: RefObject<HTMLDivElement>
  setFullScreen: (val: boolean) => void
  isFullscreen: boolean
}

export const VideoCallContext = createContext<VideoCallContextData>({} as VideoCallContextData)

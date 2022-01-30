import IMessage from "../chat/IMessage";

export default interface IVideoCall {
  answear: rtcRes,
  creator: string 
  id: string 
  offer: rtcRes 
  timestamp: number 
  to: string
  roomId: string
}

interface rtcRes { type: string, sdp: string }

export interface IVideoEndedCall extends IMessage {
  body: {
    timestamp: { seconds: number },
    callLength: number
  }
}
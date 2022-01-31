export default interface VideoCallRequest {
  creator: string 
  roomId: string 
  timestamp: { seconds: number },
  to: string 
  callId: string
  creatorImage: string 
  creatorName: string
  id: string
}
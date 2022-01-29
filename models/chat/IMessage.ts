export default interface IMessage {
  userId: string 
  userImage: string 
  username: string
  id?: string 
  createdAt: { seconds: number, nanoseconds: number }
  role: string
}

export default interface IUser {
  email: string 
  photoURL: string 
  displayName: string 
  uid: string
  lastVisit?: {seconds: number, nanoseconds: number} | any
  isOnline?: boolean
}



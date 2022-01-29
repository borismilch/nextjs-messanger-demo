import User from "./userInterfaces/IUser";
import useUploadDataReult from "./hooks/IuseUploadDataReult";
import uerInputValueArr from './hooks/IsuerInputValueArr'

import ChatSidebarItem from './sidebar/IChatSidebarItem'
import DropItem from './forms/IDropItem'
import Room from './chat/IRoom'
import Message from './chat/IMessage'
import Reaction from './chat/IReaction'

import Document from './chat/IDocumet'

import Mage from './media/IMages'


export interface IUser extends User {}
export interface IuseUploadDataReult extends useUploadDataReult {}
export interface IuserInputValueArr extends uerInputValueArr {}

export interface IChatSidebarItem extends ChatSidebarItem {}

export interface IDropItem extends DropItem {}
export interface IRoom extends Room {}
export interface IMessage extends Message {}
export interface IReaction extends Reaction {}
export interface IPicture extends Mage {}


export interface ITextMessage extends IMessage {
  body: string
}

export interface ServerMessage {
  id: string 
  role: string
}

export interface ITimeMessage extends ServerMessage {
  time: { seconds: number }
}

export interface IMageMessage extends IMessage {
  body: {url: string, id: number}[] 
}

export interface ISlide {
  url: string, 
  id: number
}

export interface IVideoMessage extends IMessage {
  body: { url: string, id: number }
}

export interface IVideo extends ISlide {}

export interface ImageInterface extends ISlide {}

export interface IDocument extends Document {}

export interface IDocumentMessage extends IMessage {
  body: IDocument[]
}

export interface IVoiceMessage extends IMessage {
  body: { url: string, id: number }
}
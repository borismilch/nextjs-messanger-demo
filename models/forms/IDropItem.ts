import { ReactElement } from "react";

export default interface IDropItem {
  Icon: ReactElement<null, null> | any,
  text: string,
  onClick: () => void,
  divide: boolean 

}
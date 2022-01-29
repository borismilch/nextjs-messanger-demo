import { ChangeEvent, Ref } from "react";

export default interface IuseUploadDataReult {
  dataUrl: string,
  url: string,
  getUploadedData: (file: File) => void 
  loading: boolean 
  error: string
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  triggerInput: () => void
  fileInputRef: Ref<HTMLInputElement>
  cleanImage: () => void
  bind: {
    ref: Ref<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
  }
}
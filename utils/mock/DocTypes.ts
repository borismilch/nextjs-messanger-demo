import { GrDocumentWord, GrDocumentPdf, GrDocumentCsv, GrDocumentZip } from 'react-icons/gr'

export const DocTypes = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": GrDocumentWord,
  "application/pdf": GrDocumentPdf,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": GrDocumentCsv,
  "application/x-zip-compressed": GrDocumentZip,
}

export const DocExts = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": '.docx',
  "application/pdf": '.pdf',
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": '.xlsx',
  "application/x-zip-compressed": '.zip',
}
export interface IPersistFile {
  oldFilePath: string
  newFilePath: string
  options?: {
    ignoreOldFileMissing?: boolean
    ignoreNewFileAlreadyExists?: boolean
    overwrite?: boolean
  }
}

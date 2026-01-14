export interface IMoveFile {
  oldFilePath: string
  newFilePath: string
  options?: {
    ignoreOldFileMissing?: boolean
    overwrite?: boolean
  }
}

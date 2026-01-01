export interface IPersistFile {
  oldFilePath: string
  newFilePath: string
  options?: {
    ignoreOldFileMissing?: boolean
    overwrite?: boolean
  }
}

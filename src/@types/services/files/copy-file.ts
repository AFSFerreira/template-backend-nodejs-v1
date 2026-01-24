export interface ICopyFile {
  sourceFilePath: string
  newFilename?: string
  destinationFolderPath: string
  buildShard?: boolean
}

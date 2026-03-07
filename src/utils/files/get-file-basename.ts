import path from 'node:path'

export function getFileBasename(filePath: string, suffix?: string) {
  return path.basename(filePath, suffix)
}

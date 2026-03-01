import path from 'node:path'

export function getFileExtension(file: string) {
  return path.extname(file).slice(1).toLowerCase()
}

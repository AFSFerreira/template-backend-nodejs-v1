import path from 'node:path'

export function buildShardFileFolder(filename: string) {
  if (filename.length < 4) return ''
  return path.join(filename.slice(0, 2), filename.slice(2, 4))
}

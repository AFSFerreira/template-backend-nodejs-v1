import fs from 'fs-extra'

export function folderExistsSync(path: string) {
  return fs.ensureDir(path)
}

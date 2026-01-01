import fs from 'fs-extra'

export function fileExistsSync(filename: string) {
  return fs.existsSync(filename)
}

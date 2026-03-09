import fs from 'fs-extra'

export async function CreateFileWriteSteam(filename: string) {
  return fs.createWriteStream(filename)
}

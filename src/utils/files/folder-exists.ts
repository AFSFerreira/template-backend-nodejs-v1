import fs from 'fs-extra'

export async function folderExists(path: string) {
  return await fs.exists(path)
}

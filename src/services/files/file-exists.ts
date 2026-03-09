import fs from 'fs-extra'

export async function fileExists(filename: string) {
  return await fs.exists(filename)
}

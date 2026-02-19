import fs from 'node:fs/promises'

export async function listFiles(dir: string) {
  return await fs.readdir(dir, { withFileTypes: true })
}

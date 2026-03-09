import fs from 'node:fs/promises'

export async function getFileStats(filePath: string) {
  return await fs.stat(filePath)
}

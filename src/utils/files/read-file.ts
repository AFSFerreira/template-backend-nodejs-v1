import fs from 'fs-extra'

export async function readFile(absolutePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(absolutePath, 'utf-8')
    return content
  } catch {
    return null
  }
}

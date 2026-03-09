import { getFileStats } from './get-file-stats'

export async function getFileAgeInMs(filePath: string) {
  const st = await getFileStats(filePath)
  const created = st.birthtimeMs || st.ctimeMs || st.mtimeMs
  return Date.now() - created
}

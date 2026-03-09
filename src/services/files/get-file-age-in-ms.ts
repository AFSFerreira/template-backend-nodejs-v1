import { getFileStats } from './get-file-stats'

/**
 * Calcula a idade de um arquivo em milissegundos a partir da data de criação.
 *
 * Usa `birthtimeMs` como preferência, com fallback para `ctimeMs` e `mtimeMs`.
 *
 * @param filePath - Caminho absoluto do arquivo.
 * @returns Idade do arquivo em milissegundos.
 */
export async function getFileAgeInMs(filePath: string) {
  const st = await getFileStats(filePath)
  const created = st.birthtimeMs || st.ctimeMs || st.mtimeMs
  return Date.now() - created
}

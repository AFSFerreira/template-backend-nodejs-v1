import dayjs from 'dayjs'

/**
 * Gera um timestamp no formato `YYYY-MM-DD` a partir de uma data.
 *
 * Útil para gerar nomes de arquivos, chaves de cache ou identificadores baseados em data
 * sem incluir informações de horário.
 *
 * @param date - Data de referência. Se omitida, utiliza a data atual.
 * @returns String formatada no padrão ISO date (`YYYY-MM-DD`).
 *
 * @example
 * generateTimestamp() // '2026-03-08'
 * generateTimestamp(new Date('2025-01-15')) // '2025-01-15'
 */
export function generateTimestamp(date: Date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD')
}

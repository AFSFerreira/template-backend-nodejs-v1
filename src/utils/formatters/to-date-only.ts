/**
 * Converte uma data para um objeto `Date` contendo apenas a parte de data (ano, mês, dia) em UTC,
 * zerando horas, minutos, segundos e milissegundos.
 *
 * Útil para comparações de data no banco de dados onde horários não devem interferir
 * (ex: filtros de encontros "pendentes" vs "finalizados").
 *
 * @param date - Data de referência.
 * @returns Nova instância de `Date` em UTC com horário zerado (00:00:00.000Z).
 *
 * @example
 * toDateOnlyUTC(new Date('2026-03-08T15:30:00Z')) // Date('2026-03-08T00:00:00.000Z')
 */
export function toDateOnlyUTC(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

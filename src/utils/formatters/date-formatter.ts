import dayjs from 'dayjs'

/**
 * Utilitário para formatação de datas em português brasileiro.
 *
 * Fornece métodos estáticos para formatar datas individuais e agrupar múltiplas
 * datas de forma legível, utilizando conjunções (`e`) e vírgulas conforme as regras
 * gramaticais do pt-BR via `Intl.ListFormat`.
 */
export class DateFormatter {
  /**
   * Formata uma data no formato extenso em português.
   *
   * @param date - Data a ser formatada (objeto `Date` ou string ISO).
   * @returns Data formatada (ex: `08 de março de 2026`).
   *
   * @example
   * DateFormatter.formatFullDate(new Date('2026-03-08'))  // '08 de março de 2026'
   * DateFormatter.formatFullDate('2025-12-25')            // '25 de dezembro de 2025'
   */
  public static formatFullDate(date: Date | string): string {
    return dayjs(date).format('DD [de] MMMM [de] YYYY')
  }

  /**
   * Agrupa e formata múltiplas datas de forma legível em português.
   *
   * Se todas as datas pertencem ao mesmo mês e ano, exibe apenas os dias concatenados
   * com " e " (ex: `13, 14 e 15 de outubro`). Caso contrário, exibe cada data com
   * seu respectivo mês (ex: `31 de outubro e 01 de novembro`).
   *
   * @param dates - Array de datas a serem agrupadas.
   * @returns String formatada com as datas agrupadas, ou string vazia se o array estiver vazio.
   *
   * @example
   * DateFormatter.formatGroupedDates([new Date('2026-10-13'), new Date('2026-10-14'), new Date('2026-10-15')])
   * // '13, 14 e 15 de outubro'
   *
   * DateFormatter.formatGroupedDates([new Date('2026-10-31'), new Date('2026-11-01')])
   * // '31 de outubro e 01 de novembro'
   *
   * DateFormatter.formatGroupedDates([new Date('2026-03-08')])
   * // '08 de março'
   */
  public static formatGroupedDates(dates: Array<Date | string>): string {
    if (!dates || dates.length === 0) return ''
    if (dates.length === 1) return dayjs(dates[0]).format('DD [de] MMMM')

    // Converte e garante que as datas estão em ordem cronológica:
    const sortedDays = dates.map((d) => dayjs(d)).sort((a, b) => a.valueOf() - b.valueOf())

    const firstDate = sortedDays[0]
    const lastDate = sortedDays[sortedDays.length - 1]

    // O formatador nativo de listas do JS (Faz a mágica do ", " e do " e "):
    const listFormatter = new Intl.ListFormat('pt-BR', {
      style: 'long',
      type: 'conjunction',
    })

    // Dentro do mesmo mês e ano:
    const isSameMonthAndYear = firstDate.month() === lastDate.month() && firstDate.year() === lastDate.year()

    if (isSameMonthAndYear) {
      // Extrai apenas os dias ('13', '14', '15'):
      const daysOnly = sortedDays.map((d) => d.format('DD'))

      // listFormatter.format(['13', '14', '15']) retorna "13, 14 e 15":
      const joinedDays = listFormatter.format(daysOnly)

      return `${joinedDays} de ${firstDate.format('MMMM')}`
    } else {
      // Organiza como "31 de outubro e 01 de novembro":
      const daysAndMonths = sortedDays.map((d) => d.format('DD [de] MMMM'))

      return listFormatter.format(daysAndMonths)
    }
  }
}

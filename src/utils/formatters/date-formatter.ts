import dayjs from 'dayjs'

export class DateFormatter {
  public static formatFullDate(date: Date | string): string {
    return dayjs(date).format('DD [de] MMMM [de] YYYY')
  }

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

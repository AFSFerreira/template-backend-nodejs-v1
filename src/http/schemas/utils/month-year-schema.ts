import { nonemptyTextSchema } from './nonempty-text'
import { YEAR_MONTH_REGEX } from '@/constants/regex'

const VALID_DATE_RANGE_YEARS = 100

export const monthYearSchema = nonemptyTextSchema
  .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
  .transform((str) => new Date(`${str}-01T00:00:00Z`))
  .refine((inputDate) => {
    const currentDate = new Date()

    const minValidDate = new Date(currentDate)
    minValidDate.setFullYear(currentDate.getFullYear() - VALID_DATE_RANGE_YEARS)

    const maxValidDate = new Date(currentDate)
    maxValidDate.setFullYear(currentDate.getFullYear() + VALID_DATE_RANGE_YEARS)

    return inputDate >= minValidDate && inputDate <= maxValidDate
  })

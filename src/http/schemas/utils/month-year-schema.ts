import { nonemptyTextSchema } from './nonempty-text'
import { YEAR_MONTH_REGEX } from '@/constants/regex'

export const monthYearSchema = nonemptyTextSchema
  .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
  .transform((str) => new Date(`${str}-01T00:00:00Z`))

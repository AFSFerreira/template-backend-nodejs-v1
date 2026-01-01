import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_DATE_RANGE } from '@messages/validations/user-validations'
import z from 'zod'

export const rangedDateSchema = z.coerce.date().refine((date) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const minValidDate = new Date(currentDate)
  minValidDate.setFullYear(currentYear - VALID_DATE_RANGE_YEARS)

  const maxValidDate = new Date(currentDate)
  maxValidDate.setFullYear(currentYear + VALID_DATE_RANGE_YEARS)

  return date >= minValidDate && date <= maxValidDate
}, INVALID_DATE_RANGE)

import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_BIRTHDATE_RANGE } from '@messages/validations'
import z from 'zod'

export const birthdateSchema = z.coerce.date().refine((date) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const minValidDate = new Date(currentDate)
  minValidDate.setFullYear(currentYear - VALID_DATE_RANGE_YEARS)

  return date <= currentDate && date >= minValidDate
}, INVALID_BIRTHDATE_RANGE)

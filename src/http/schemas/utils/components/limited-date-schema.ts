import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import z from 'zod'

export const birthdateSchema = z.coerce.date().refine((data) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const minValidDate = new Date(currentDate)
  minValidDate.setFullYear(currentYear - VALID_DATE_RANGE_YEARS)

  return data <= currentDate && data >= minValidDate
})

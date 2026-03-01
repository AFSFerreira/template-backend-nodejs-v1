import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_DATE_RANGE } from '@messages/validations/user-validations'
import dayjs from 'dayjs'
import z from 'zod'

export const rangedDateSchema = z.coerce.date().refine((date) => {
  const now = dayjs()
  const minValidDate = now.subtract(VALID_DATE_RANGE_YEARS, 'year').toDate()
  const maxValidDate = now.add(VALID_DATE_RANGE_YEARS, 'year').toDate()

  return date >= minValidDate && date <= maxValidDate
}, INVALID_DATE_RANGE)

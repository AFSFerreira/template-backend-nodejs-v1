import { YEAR_MONTH_REGEX } from '@constants/regex-constants'
import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_DATE_RANGE, MONTH_YEAR_INVALID_FORMAT } from '@messages/validations/common-validations'
import dayjs from 'dayjs'
import { uppercaseTextWithoutInnerSpacesSchema } from '../primitives/uppercase-text-without-inner-spaces-schema'

export const monthYearSchema = uppercaseTextWithoutInnerSpacesSchema
  .regex(YEAR_MONTH_REGEX, MONTH_YEAR_INVALID_FORMAT)
  .transform((str) => new Date(`${str}-01T00:00:00Z`))
  .refine((inputDate) => {
    const now = dayjs()
    const minValidDate = now.subtract(VALID_DATE_RANGE_YEARS, 'year').toDate()
    const maxValidDate = now.add(VALID_DATE_RANGE_YEARS, 'year').toDate()

    return inputDate >= minValidDate && inputDate <= maxValidDate
  }, INVALID_DATE_RANGE)

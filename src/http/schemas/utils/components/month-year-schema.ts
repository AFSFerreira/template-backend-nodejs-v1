import { YEAR_MONTH_REGEX } from '@constants/regex'
import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_DATE_RANGE, MONTH_YEAR_INVALID_FORMAT } from 'src/messages/validation'
import { uppercaseTextWithoutInnerSpacesSchema } from '../primitives/uppercase-text-without-inner-spaces-schema'

export const monthYearSchema = uppercaseTextWithoutInnerSpacesSchema
  .regex(YEAR_MONTH_REGEX, MONTH_YEAR_INVALID_FORMAT)
  .transform((str) => new Date(`${str}-01T00:00:00Z`))
  .refine((inputDate) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    const minValidDate = new Date(currentDate)
    minValidDate.setFullYear(currentYear - VALID_DATE_RANGE_YEARS)

    const maxValidDate = new Date(currentDate)
    maxValidDate.setFullYear(currentYear + VALID_DATE_RANGE_YEARS)

    return inputDate >= minValidDate && inputDate <= maxValidDate
  }, INVALID_DATE_RANGE)

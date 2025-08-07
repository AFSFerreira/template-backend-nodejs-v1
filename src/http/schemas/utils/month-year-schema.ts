import { uppercaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces-schema'
import { messages } from '@/constants/messages'
import { YEAR_MONTH_REGEX } from '@/constants/regex'
import { VALID_DATE_RANGE_YEARS } from '@/constants/zod-constants'

export const monthYearSchema = uppercaseTextWithoutInnerSpacesSchema
  .regex(YEAR_MONTH_REGEX, messages.validation.monthYearInvalidFormat)
  .transform((str) => new Date(`${str}-01T00:00:00Z`))
  .refine((inputDate) => {
    const currentDate = new Date()

    const minValidDate = new Date(currentDate)
    minValidDate.setFullYear(currentDate.getFullYear() - VALID_DATE_RANGE_YEARS)

    const maxValidDate = new Date(currentDate)
    maxValidDate.setFullYear(currentDate.getFullYear() + VALID_DATE_RANGE_YEARS)

    return inputDate >= minValidDate && inputDate <= maxValidDate
  }, messages.validation.invalidDateRange)

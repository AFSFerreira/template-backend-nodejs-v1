import { VALID_DATE_RANGE_YEARS } from '@constants/validation-constants'
import { INVALID_DATE_RANGE } from '@messages/validations/common-validations'
import { positiveIntegerSchema } from './positive-integer-schema'

export const rangedYearSchema = positiveIntegerSchema.refine(
  (data) => {
    const currentYear = new Date().getFullYear()

    return data >= currentYear - VALID_DATE_RANGE_YEARS && data <= currentYear
  },
  {
    error: INVALID_DATE_RANGE,
  },
)

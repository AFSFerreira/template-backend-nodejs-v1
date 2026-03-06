import { rangedDateArraySchema } from '@lib/zod/utils/generic-components/ranged-date-array-schema'

export const meetingDatesSchema = rangedDateArraySchema.min(1).max(31)

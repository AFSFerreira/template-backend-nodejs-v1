import { INVALID_CRON_FORMAT } from '@messages/validations/common-validations'
import { isValidCron } from 'cron-validator'
import { nonemptyTextSchema } from '../primitives/nonempty-text-schema'

export const cronSchema = nonemptyTextSchema.refine((val) => isValidCron(val), INVALID_CRON_FORMAT)

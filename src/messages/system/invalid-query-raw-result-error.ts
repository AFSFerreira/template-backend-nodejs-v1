import type { ZodError } from 'zod'
import { SystemError } from '@errors/system-error'
import { INVALID_QUERY_RAW_RESULT } from '@messages/system/repository'
import { z } from 'zod'

export class InvalidQueryRawResultError extends SystemError {
  constructor(zodError: ZodError) {
    super({
      ...INVALID_QUERY_RAW_RESULT,
      issues: z.treeifyError(zodError),
    })
  }
}

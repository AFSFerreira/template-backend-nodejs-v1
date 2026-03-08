import { SystemError } from '@errors/system-error'
import { PRISMA_MODEL_NAME_NOT_RESOLVED } from '@messages/system/prisma'

export class PrismaModelNameNotResolvedError extends SystemError {
  constructor() {
    super(PRISMA_MODEL_NAME_NOT_RESOLVED)
  }
}

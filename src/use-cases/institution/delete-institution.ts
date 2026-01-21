import type {
  DeleteInstitutionUseCaseRequest,
  DeleteInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/delete-institution'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_DELETED_SUCCESSFULLY } from '@messages/loggings/institution-loggings'
import { InstitutionNotFoundError } from '@use-cases/errors/institution/institution-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteInstitutionUseCase {
  constructor(
    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteInstitutionUseCaseRequest): Promise<DeleteInstitutionUseCaseResponse> {
    await this.dbContext.runInTransaction(async () => {
      const institution = ensureExists({
        value: await this.institutionsRepository.findByPublicId(publicId),
        error: new InstitutionNotFoundError(),
      })

      await this.institutionsRepository.delete(institution.id)
    })

    logger.info({ institutionPublicId: publicId }, INSTITUTION_DELETED_SUCCESSFULLY)

    return {}
  }
}

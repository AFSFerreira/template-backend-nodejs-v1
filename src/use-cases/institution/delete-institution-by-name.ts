import type {
  DeleteInstitutionByNameUseCaseRequest,
  DeleteInstitutionByNameUseCaseResponse,
} from '@custom-types/use-cases/institution/delete-institution-by-name'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_DELETED_SUCCESSFULLY } from '@messages/loggings/institution-loggings'
import { InstitutionNotFoundError } from '@use-cases/errors/institution/institution-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteInstitutionByNameUseCase {
  constructor(
    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ name }: DeleteInstitutionByNameUseCaseRequest): Promise<DeleteInstitutionByNameUseCaseResponse> {
    await this.dbContext.runInTransaction(async () => {
      const institution = ensureExists({
        value: await this.institutionsRepository.findByName(name),
        error: new InstitutionNotFoundError(),
      })

      await this.institutionsRepository.delete(institution.id)
    })

    logger.info({ institutionName: name }, INSTITUTION_DELETED_SUCCESSFULLY)

    return {}
  }
}

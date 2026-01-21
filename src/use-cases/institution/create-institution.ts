import type {
  CreateInstitutionUseCaseRequest,
  CreateInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/create-institution'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_CREATED_SUCCESSFULLY } from '@messages/loggings/institution-loggings'
import { InstitutionAlreadyExistsError } from '@use-cases/errors/institution/institution-already-exists-error'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateInstitutionUseCase {
  constructor(
    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    createInstitutionUseCaseInput: CreateInstitutionUseCaseRequest,
  ): Promise<CreateInstitutionUseCaseResponse> {
    const { institution } = await this.dbContext.runInTransaction(async () => {
      ensureNotExists({
        value: await this.institutionsRepository.findByName(createInstitutionUseCaseInput.name),
        error: new InstitutionAlreadyExistsError(),
      })

      const createdInstitution = await this.institutionsRepository.create(createInstitutionUseCaseInput)

      return { institution: createdInstitution }
    })

    logger.info(createInstitutionUseCaseInput, INSTITUTION_CREATED_SUCCESSFULLY)

    return { institution }
  }
}

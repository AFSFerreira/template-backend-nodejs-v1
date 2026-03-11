import type {
  CreateInstitutionUseCaseRequest,
  CreateInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/create-institution'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_CREATED_SUCCESSFULLY } from '@messages/loggings/models/institution-loggings'
import { InstitutionAlreadyExistsError } from '@use-cases/errors/institution/institution-already-exists-error'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateInstitutionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(
    createInstitutionUseCaseInput: CreateInstitutionUseCaseRequest,
  ): Promise<CreateInstitutionUseCaseResponse> {
    ensureNotExists({
      value: await this.institutionsRepository.findByName(createInstitutionUseCaseInput.name),
      error: new InstitutionAlreadyExistsError(),
    })

    const institution = await this.institutionsRepository.create(createInstitutionUseCaseInput)

    logger.info(createInstitutionUseCaseInput, INSTITUTION_CREATED_SUCCESSFULLY)

    return { institution }
  }
}

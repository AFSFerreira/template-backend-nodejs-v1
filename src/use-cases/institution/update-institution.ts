import type { UpdateInstitutionQuery } from '@custom-types/repository/prisma/institution/update-institution-query'
import type {
  UpdateInstitutionUseCaseRequest,
  UpdateInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/update-institution'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/institution-loggings'
import { InstitutionAlreadyExistsError } from '@use-cases/errors/institution/institution-already-exists-error'
import { InstitutionNotFoundError } from '@use-cases/errors/institution/institution-not-found-error'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute({ publicId, data }: UpdateInstitutionUseCaseRequest): Promise<UpdateInstitutionUseCaseResponse> {
    const updateData: UpdateInstitutionQuery['data'] = {}

    const foundInstitution = ensureExists({
      value: await this.institutionsRepository.findByPublicId(publicId),
      error: new InstitutionNotFoundError(),
    })

    if (data.name) {
      ensureNotExists({
        value: await this.institutionsRepository.findByName(data.name),
        error: new InstitutionAlreadyExistsError(),
      })

      updateData.name = data.name
    }

    const shouldUpdate = Object.keys(updateData).length > 0

    const institution = shouldUpdate
      ? await this.institutionsRepository.update({
          id: foundInstitution.id,
          data: updateData,
        })
      : foundInstitution

    logger.info({ publicId, ...data }, INSTITUTION_UPDATED_SUCCESSFULLY)

    return { institution }
  }
}

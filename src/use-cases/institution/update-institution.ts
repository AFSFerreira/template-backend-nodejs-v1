import type {
  UpdateInstitutionUseCaseRequest,
  UpdateInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/update-institution'
import { logger } from '@lib/logger'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { INSTITUTION_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/institution-loggings'
import type { Prisma } from '@prisma/generated/client'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import { InstitutionAlreadyExistsError } from '@use-cases/errors/institution/institution-already-exists-error'
import { InstitutionNotFoundError } from '@use-cases/errors/institution/institution-not-found-error'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateInstitutionUseCaseRequest): Promise<UpdateInstitutionUseCaseResponse> {
    const updateData: Prisma.InstitutionUpdateInput = {}

    const { institution } = await this.dbContext.runInTransaction(async () => {
      const institution = ensureExists({
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

      const updatedInstitution = shouldUpdate
        ? await this.institutionsRepository.update({
            id: institution.id,
            data: updateData,
          })
        : institution

      return { institution: updatedInstitution }
    })

    logger.info({ publicId, ...data }, INSTITUTION_UPDATED_SUCCESSFULLY)

    return { institution }
  }
}

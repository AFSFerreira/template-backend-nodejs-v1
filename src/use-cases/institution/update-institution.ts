import type {
  UpdateInstitutionUseCaseRequest,
  UpdateInstitutionUseCaseResponse,
} from '@custom-types/use-cases/institution/update-institution'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
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

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateInstitutionUseCaseRequest): Promise<UpdateInstitutionUseCaseResponse> {
    const { institution } = await this.dbContext.runInTransaction(async () => {
      const institution = ensureExists({
        value: await this.institutionsRepository.findByPublicId(publicId),
        error: new InstitutionNotFoundError(),
      })

      const updateData: Prisma.InstitutionUpdateInput = {}

      if (data.name) {
        ensureNotExists({
          value: await this.institutionsRepository.findByName(data.name),
          error: new InstitutionAlreadyExistsError(),
        })

        updateData.name = data.name
      }

      const updatedInstitution = await this.institutionsRepository.update({
        id: institution.id,
        data: updateData,
      })

      return { institution: updatedInstitution }
    })

    logger.info({ publicId, ...data }, INSTITUTION_UPDATED_SUCCESSFULLY)

    return { institution }
  }
}

import type { UpdateInstitutionalInfoQuery } from '@custom-types/repository/institutional-info/update-institutional-info-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InstitutionalInfo } from '@prisma/client'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaInstitutionalInfoRepository implements InstitutionalInfoRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async getInstitutionalInfo() {
    const institutionalInfo = (await this.dbContext.client.institutionalInfo.findFirst()) as InstitutionalInfo
    return institutionalInfo
  }

  async update({ id, data }: UpdateInstitutionalInfoQuery) {
    return await this.dbContext.client.institutionalInfo.update({
      where: { id },
      data,
    })
  }
}

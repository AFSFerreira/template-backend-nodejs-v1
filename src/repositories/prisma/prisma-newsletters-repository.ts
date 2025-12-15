import type { CreateNewsletterQuery } from '@custom-types/repository/newsletter/create-newsletter-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Newsletter } from '@prisma/client'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaNewslettersRepository implements NewslettersRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateNewsletterQuery): Promise<Newsletter> {
    const newsletter = await this.dbContext.client.newsletter.create({
      data,
    })
    return newsletter
  }
}

import type { UpdatePaymentInfoQuery } from '@custom-types/repository/prisma/payment-info/update-payment-info-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { PaymentInfoRepository } from '@repositories/payment-info-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaPaymentInfoRepository implements PaymentInfoRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async getPaymentInfo() {
    const paymentInfo = await this.dbContext.client.paymentInfo.findFirst()
    return paymentInfo
  }

  async update({ data }: UpdatePaymentInfoQuery) {
    return await this.dbContext.client.paymentInfo.update({
      where: { id: 1 },
      data,
    })
  }
}

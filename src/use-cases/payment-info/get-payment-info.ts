import type { GetPaymentInfoUseCaseResponse } from '@custom-types/use-cases/payment-info/get-payment-info'
import type { PaymentInfoRepository } from '@repositories/payment-info-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { PaymentInfoNotFoundError } from '../errors/payment-info/payment-info-not-found-error'

@injectable()
export class GetPaymentInfoUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.paymentInfo)
    private readonly paymentInfoRepository: PaymentInfoRepository,
  ) {}

  async execute(): Promise<GetPaymentInfoUseCaseResponse> {
    const paymentInfo = ensureExists({
      value: await this.paymentInfoRepository.getPaymentInfo(),
      error: new PaymentInfoNotFoundError(),
    })

    return {
      paymentInfo,
    }
  }
}

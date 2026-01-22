import type {
  UpdatePaymentInfoUseCaseRequest,
  UpdatePaymentInfoUseCaseResponse,
} from '@custom-types/use-cases/payment-info/update-payment-info'
import type { PaymentInfoRepository } from '@repositories/payment-info-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { PaymentInfoNotFoundError } from '../errors/payment-info/payment-info-not-found-error'

@injectable()
export class UpdatePaymentInfoUseCase {
  constructor(
    @inject(tokens.repositories.paymentInfo)
    private readonly paymentInfoRepository: PaymentInfoRepository,
  ) {}

  async execute({ data }: UpdatePaymentInfoUseCaseRequest): Promise<UpdatePaymentInfoUseCaseResponse> {
    const currentPaymentInfo = ensureExists({
      value: await this.paymentInfoRepository.getPaymentInfo(),
      error: new PaymentInfoNotFoundError(),
    })

    const paymentInfo = await this.paymentInfoRepository.update({
      id: currentPaymentInfo.id,
      data,
    })

    return {
      paymentInfo,
    }
  }
}

import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPPaymentInfo, PaymentInfoPresenterInput } from '@custom-types/http/presenter/payment-info/payment-info'

export class PaymentInfoDefaultPresenter implements IPresenterStrategy<PaymentInfoPresenterInput, HTTPPaymentInfo> {
  public toHTTP(input: PaymentInfoPresenterInput): HTTPPaymentInfo {
    return {
      pixKey: input.pixKey,
      bank: input.bank,
      code: input.code,
      agency: input.agency,
      account: input.account,
    }
  }
}

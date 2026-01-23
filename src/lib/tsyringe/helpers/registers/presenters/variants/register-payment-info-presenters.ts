import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PaymentInfoDefaultPresenter } from '@presenters/payment-info/payment-info.presenter'

export function registerPaymentInfoPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.paymentInfo.paymentInfoDefault,
    container,
    target: PaymentInfoDefaultPresenter,
  })
}

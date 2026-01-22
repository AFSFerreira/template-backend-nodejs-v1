import type { HTTPPaymentInfo, PaymentInfoPresenterInput } from '@custom-types/http/presenter/payment-info/payment-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PaymentInfoPresenter } from '@presenters/payment-info-presenter'
import { GetPaymentInfoUseCase } from '@use-cases/payment-info/get-payment-info'
import { container } from 'tsyringe'

export async function getPaymentInfo(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetPaymentInfoUseCase)

  const { paymentInfo } = await useCase.execute()

  const formattedReply = PaymentInfoPresenter.toHTTP<PaymentInfoPresenterInput, HTTPPaymentInfo>(paymentInfo)

  return await reply.status(200).send({ data: formattedReply })
}

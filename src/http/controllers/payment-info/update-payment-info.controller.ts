import type { HTTPPaymentInfo, PaymentInfoPresenterInput } from '@custom-types/http/presenter/payment-info/payment-info'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PaymentInfoPresenter } from '@presenters/payment-info-presenter'
import { updatePaymentInfoBodySchema } from '@schemas/payment-info/update-payment-info-body-schema'
import { UpdatePaymentInfoUseCase } from '@use-cases/payment-info/update-payment-info'
import { container } from 'tsyringe'

export async function updatePaymentInfo(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = updatePaymentInfoBodySchema.parse(request.body)

  const useCase = container.resolve(UpdatePaymentInfoUseCase)

  const { paymentInfo } = await useCase.execute({ data: parsedBody })

  const formattedReply = PaymentInfoPresenter.toHTTP<PaymentInfoPresenterInput, HTTPPaymentInfo>(paymentInfo)

  return await reply.status(200).send({ data: formattedReply })
}

import type { ZodRequest } from '@custom-types/custom/zod-request'
import type { DeleteInstitutionParamsType } from '@custom-types/http/schemas/institution/delete-institution-params-schema'
import type { FastifyReply } from 'fastify'
import { DeleteInstitutionUseCase } from '@use-cases/institution/delete-institution'
import { container } from 'tsyringe'

export async function deleteInstitution(
  request: ZodRequest<{ params: DeleteInstitutionParamsType }>,
  reply: FastifyReply,
) {
  const { publicId } = request.params

  const useCase = container.resolve(DeleteInstitutionUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}

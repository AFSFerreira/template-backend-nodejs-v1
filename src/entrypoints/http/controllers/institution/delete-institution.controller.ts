import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteInstitutionParamsSchema } from '@http/schemas/institution/delete-institution-params-schema'
import { DeleteInstitutionUseCase } from '@use-cases/institution/delete-institution'
import { container } from 'tsyringe'

export async function deleteInstitution(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = deleteInstitutionParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteInstitutionUseCase)

  await useCase.execute({ publicId })

  return await reply.status(204).send()
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import { deleteInstitutionByNameParamsSchema } from '@schemas/institution/delete-institution-by-name-params-schema'
import { DeleteInstitutionByNameUseCase } from '@use-cases/institution/delete-institution-by-name'
import { container } from 'tsyringe'

export async function deleteInstitutionByName(request: FastifyRequest, reply: FastifyReply) {
  const { name } = deleteInstitutionByNameParamsSchema.parse(request.params)

  const useCase = container.resolve(DeleteInstitutionByNameUseCase)

  await useCase.execute({ name })

  return await reply.status(204).send()
}

import path from 'node:path'
import { makeGetStatuteUseCase } from '@factories/document-management/make-get-statute-use-case'
import { mapExtensionToMimeType } from '@utils/mappers/map-mime-type'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getStatute(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetStatuteUseCase()

  const { filename, stream } = await useCase.execute()

  return await reply
    .header('Content-Type', mapExtensionToMimeType(path.extname(filename)))
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(stream)
}

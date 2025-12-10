import type { FastifyReply, FastifyRequest } from 'fastify'
import path from 'node:path'
import { GetStatuteUseCase } from '@use-cases/document-management/get-statute'
import { mapExtensionToMimeType } from '@utils/mappers/map-mime-type'
import { container } from 'tsyringe'

export async function getStatute(_request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(GetStatuteUseCase)

  const { filename, stream } = await useCase.execute()

  return await reply
    .header('Content-Type', mapExtensionToMimeType(path.extname(filename)))
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(stream)
}

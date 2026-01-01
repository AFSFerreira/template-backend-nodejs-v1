import type { FastifyReply, FastifyRequest } from 'fastify'
import { PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { electionNoticeMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@schemas/utils/generic-components/document-schema'
import { UploadElectionNoticeUseCase } from '@use-cases/document-management/upload-election-notice'
import { container } from 'tsyringe'

export async function uploadElectionNotice(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(electionNoticeMultipartFileConfig)

  const { filename } = documentSchema.parse(filePart)

  const useCase = container.resolve(UploadElectionNoticeUseCase)

  await useCase.execute({ filePart, baseFolder: PUBLIC_DOCUMENTS_PATH, originalFilename: filename })

  return await reply.status(201).send()
}

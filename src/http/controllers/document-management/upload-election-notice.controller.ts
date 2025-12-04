import { DOCUMENTS_PATH } from '@constants/file-constants'
import { electionNoticeMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { makeUploadElectionNoticeUseCase } from '@factories/document-management/make-upload-election-notice-use-case'
import { documentSchema } from '@schemas/utils/generic-components/document-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadElectionNotice(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(electionNoticeMultipartFileConfig)

  const { filename } = documentSchema.parse(filePart)

  const useCase = makeUploadElectionNoticeUseCase()

  await useCase.execute({ filePart, baseFolder: DOCUMENTS_PATH, originalFilename: filename })

  return await reply.status(201).send()
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadMeetingBannerUseCase } from '@use-cases/meeting/upload-meeting-banner'
import { container } from 'tsyringe'

export async function uploadMeetingBanner(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(meetingBannerMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadMeetingBannerUseCase)

  const { filename } = await useCase.execute({ filePart })

  return await reply.status(200).send({ data: { meetingBanner: filename } })
}

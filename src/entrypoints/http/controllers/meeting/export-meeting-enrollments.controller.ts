import type { FastifyReply, FastifyRequest } from 'fastify'
import { exportMeetingEnrollmentsParamsSchema } from '@http/schemas/meeting/export-meeting-enrollments-params-schema'
import { exportMeetingEnrollmentsQuerySchema } from '@http/schemas/meeting/export-meeting-enrollments-query-schema'
import { ExportMeetingEnrollmentsUseCase } from '@use-cases/meeting-enrollment/export-meeting-enrollments'
import { container } from 'tsyringe'

export async function exportMeetingEnrollments(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = exportMeetingEnrollmentsParamsSchema.parse(request.params)
  const { format } = exportMeetingEnrollmentsQuerySchema.parse(request.query)

  const useCase = container.resolve(ExportMeetingEnrollmentsUseCase)

  const { reportStream, filename, contentTypeHeader } = await useCase.execute({
    meetingPublicId: publicId,
    format,
  })

  return await reply
    .header(contentTypeHeader.key, contentTypeHeader.value)
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(reportStream)
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import { EXCEL_CONTENT_TYPE_HEADER } from '@constants/header-constants'
import { exportMeetingEnrollmentsParamsSchema } from '@schemas/meeting-enrollment/export-meeting-enrollments-params-schema'
import { ExportMeetingEnrollmentsUseCase } from '@use-cases/meeting-enrollment/export-meeting-enrollments'
import { container } from 'tsyringe'

export async function exportMeetingEnrollments(request: FastifyRequest, reply: FastifyReply) {
  const { publicId } = exportMeetingEnrollmentsParamsSchema.parse(request.params)

  const useCase = container.resolve(ExportMeetingEnrollmentsUseCase)

  const { reportStream, filename } = await useCase.execute({ meetingPublicId: publicId })

  return await reply
    .header(EXCEL_CONTENT_TYPE_HEADER.key, EXCEL_CONTENT_TYPE_HEADER.value)
    .header('Content-Disposition', `attachment; filename="${filename}"`)
    .send(reportStream)
}

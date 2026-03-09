import type { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterPageViewUseCase } from '@use-cases/dashboard-metrics/register-page-view'
import { getClientIp } from '@utils/http/get-client-ip'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function registerPageViewController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = container.resolve(RegisterPageViewUseCase)

  await useCase.execute({ ip: getClientIp(request) })

  return await reply.sendResponse(undefined, StatusCodes.NO_CONTENT)
}

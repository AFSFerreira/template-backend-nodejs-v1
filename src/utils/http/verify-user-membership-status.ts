import type { IApiResponse } from '@custom-types/responses/api-response'
import type { FastifyRequest } from 'fastify'
import { INACTIVE_USER, PENDING_USER, UNVERIFIED_EMAIL } from '@messages/responses/user-responses.ts/4xx'
import { MembershipStatusType } from '@prisma/generated/enums'
import { getRequestUserStatus } from '@services/http/get-request-user-status'

export function verifyUserMembershipStatus(request: FastifyRequest): IApiResponse | null {
  const status = getRequestUserStatus(request)

  switch (status) {
    case MembershipStatusType.INACTIVE:
      return INACTIVE_USER
    case MembershipStatusType.PENDING:
      return PENDING_USER
    case MembershipStatusType.VERIFYING:
      return UNVERIFIED_EMAIL
    default:
      return null
  }
}

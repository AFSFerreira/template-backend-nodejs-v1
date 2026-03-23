import type { User } from '@prisma/generated/client'
import type { UpdateUserUseCaseRequestBody } from './update-user-use-case-request-body'

export interface UpdateUserUseCaseRequest {
  id: string
  data: UpdateUserUseCaseRequestBody
}

export interface UpdateUserUseCaseResponse {
  user: User
}

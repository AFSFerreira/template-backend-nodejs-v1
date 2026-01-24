import type { RequestEmailChangeBodySchemaType } from '@custom-types/http/schemas/user/request-email-change-body-schema'

export interface RequestEmailChangeUseCaseRequest extends RequestEmailChangeBodySchemaType {
  userPublicId: string
}

export interface RequestEmailChangeUseCaseResponse {}

import type { UpdateUserBodySchemaType } from '@custom-types/schemas/user/update-user-body-schema'

export type UpdateUserUseCaseRequestBody = Omit<UpdateUserBodySchemaType, 'user'> & {
  user?: Partial<UpdateUserBodySchemaType['user']>
}

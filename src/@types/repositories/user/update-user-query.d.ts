import type { UpdateUserBodySchemaType } from '@schemas/user/update-user-body-schema'

export interface UpdateUserQuery {
  id: number
  data: Omit<UpdateUserBodySchemaType, 'user'> & {
    user: Omit<UpdateUserBodySchemaType['user'], 'password'> & {
      passwordHash: string
    }
  }
}

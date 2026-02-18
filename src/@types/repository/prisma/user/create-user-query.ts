import type { RegisterUserBodySchemaType } from '@custom-types/http/schemas/user/register-body-schema'
import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { EducationLevelType, IdentityType, OccupationType } from '@prisma/generated/enums'

export type CreateUserQuery = Omit<RegisterUserBodySchemaType, 'user' | 'address'> & {
  user: Omit<RegisterUserBodySchemaType['user'], 'password' | 'occupation' | 'educationLevel' | 'identity'> & {
    passwordHash: HashedPassword
    educationLevel: EducationLevelType
    profileImage: string
    occupation?: OccupationType

    identityType: IdentityType
    identityDocument: string
    identityDocumentBlindIndex: string

    emailVerificationTokenHash: HashedToken
    emailVerificationTokenExpiresAt: Date
  }
  address: Omit<RegisterUserBodySchemaType['address'], 'state' | 'country'> & { stateId: number }
}

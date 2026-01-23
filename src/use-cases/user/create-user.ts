import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { CreateUserUseCaseRequest, CreateUserUseCaseResponse } from '@custom-types/use-cases/user/create-user'
import type { ApiError } from '@errors/api-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import path from 'node:path'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { EMAIL_VALIDATION_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { env } from '@env/index'
import { emailQueue } from '@jobs/queues/definitions/email-queue'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { bullmqTokens } from '@lib/bullmq/helpers/tokens'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_VERIFICATION_SUBJECT } from '@messages/emails/user-emails'
import { FAILED_TO_ENQUEUE_EMAIL_JOB } from '@messages/loggings/jobs/queues/emails'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import {
  EMAIL_VERIFICATION_SEND_ERROR,
  SUCCESSFUL_USER_CREATION,
  USER_CREATION_ERROR,
} from '@messages/loggings/models/user-loggings'
import { ActivityAreaType } from '@prisma/client'
import {
  buildUserProfileImagePath,
  buildUserTempProfileImagePath,
} from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { moveFile } from '@services/files/move-file'
import { isRegisterUserHighLevelEducation } from '@services/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@services/guards/is-register-user-high-level-student-education'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { validateInstitutionName } from '@services/validators/validate-institution-name'
import { confirmAccountHtmlTemplate } from '@templates/user/confirm-account/confirm-account-html'
import { confirmAccountTextTemplate } from '@templates/user/confirm-account/confirm-account-text'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserImageStorageError } from '@use-cases/errors/user/user-image-storage-error'
import { UserWithSameIdentityDocument } from '@use-cases/errors/user/user-with-same-identity-document-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { objectDeepEqual } from '@utils/object/object-deep-equal'
import { generateToken } from '@utils/tokens/generate-token'
import { hashToken } from '@utils/tokens/hash-token'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { UserWithSameEmail } from '../errors/user/user-with-same-email-error'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tsyringeTokens.repositories.addressStates)
    private readonly addressStatesRepository: AddressStatesRepository,

    @inject(tsyringeTokens.repositories.addressCountries)
    private readonly addressCountriesRepository: AddressCountryRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(registerUseCaseInput: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const passwordHash = await hash(registerUseCaseInput.user.password, env.HASH_SALT_ROUNDS)

    const emailVerificationToken = generateToken(RANDOM_BYTES_NUMBER)
    const emailVerificationTokenHash = hashToken(emailVerificationToken)
    const emailVerificationTokenExpiresAt = new Date(Date.now() + EMAIL_VALIDATION_EXPIRATION_TIME)

    try {
      let profileImage = DEFAULT_PROFILE_IMAGE_NAME

      if (registerUseCaseInput.user.profileImage) {
        const profileImagePersistSucessful = await moveFile({
          oldFilePath: buildUserTempProfileImagePath(registerUseCaseInput.user.profileImage),
          newFilePath: buildUserProfileImagePath(registerUseCaseInput.user.profileImage),
        })

        if (!profileImagePersistSucessful) {
          throw new UserImageStorageError()
        }

        profileImage = path.basename(profileImagePersistSucessful)
      }

      const createdUser = await this.dbContext.runInTransaction(async () => {
        const userAlreadyExists = await this.usersRepository.findConflictingUser({
          email: registerUseCaseInput.user.email,
          secondaryEmail: registerUseCaseInput.user.secondaryEmail,
          username: registerUseCaseInput.user.username,
          identity: registerUseCaseInput.user.identity as FindConflictingUserQuery['identity'],
        })

        if (userAlreadyExists) {
          const apiError = getTrueMapping<ApiError>([
            {
              expression: userAlreadyExists.email === registerUseCaseInput.user.email,
              value: new UserWithSameEmail(),
            },
            {
              expression: userAlreadyExists.username === registerUseCaseInput.user.username,
              value: new UserWithSameUsername(),
            },
            {
              expression: objectDeepEqual(
                { identityDocument: userAlreadyExists.identityDocument, identityType: userAlreadyExists.identityType },
                registerUseCaseInput.user.identity,
              ),
              value: new UserWithSameIdentityDocument(),
            },
          ])

          if (!apiError) {
            throw new UserAlreadyExistsError()
          }

          throw apiError
        }

        if (
          isRegisterUserHighLevelStudentEducation(registerUseCaseInput) ||
          isRegisterUserHighLevelEducation(registerUseCaseInput)
        ) {
          const academicPublicationsActivityAreas = registerUseCaseInput.academicPublication.map((academicPub) => ({
            area: academicPub.area,
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
          }))

          const activityAreas = [
            ...academicPublicationsActivityAreas,
            {
              area: registerUseCaseInput.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
            {
              area: registerUseCaseInput.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
          ]

          const { validatedActivityAreas, success } = await validateActivityAreas({
            activityAreas,
            activityAreasRepository: this.activityAreasRepository,
          })

          if (!success) {
            throw new InvalidActivityArea(
              validatedActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
            )
          }

          const isValidInstitution = await validateInstitutionName({
            institution: registerUseCaseInput.institution.name,
            institutionsRepository: this.institutionsRepository,
          })

          if (!isValidInstitution) {
            throw new InvalidInstitutionName()
          }
        }

        const addressCountry = await this.addressCountriesRepository.findOrCreate(registerUseCaseInput.address.country)

        const addressState = await this.addressStatesRepository.findOrCreate({
          state: registerUseCaseInput.address.state,
          countryId: addressCountry.id,
        })

        const { password, identity, ...filteredUserInfo } = registerUseCaseInput.user
        const { state, country, ...filteredAddressInfo } = registerUseCaseInput.address

        const user = await this.usersRepository.create({
          ...registerUseCaseInput,
          user: {
            ...filteredUserInfo,
            identityType: identity.identityType,
            identityDocument: identity.identityDocument,
            profileImage,
            passwordHash,
            emailVerificationTokenHash,
            emailVerificationTokenExpiresAt,
          },
          address: {
            ...filteredAddressInfo,
            stateId: addressState.id,
          },
        })

        return user
      })

      const emailInfo = {
        fullName: createdUser.fullName,
        email: createdUser.email,
        token: emailVerificationToken,
      }

      try {
        const { html, attachments } = confirmAccountHtmlTemplate(emailInfo)

        emailQueue.add(bullmqTokens.tasksNames.email, {
          to: createdUser.email,
          subject: EMAIL_VERIFICATION_SUBJECT,
          message: confirmAccountTextTemplate(emailInfo),
          html,
          attachments,
          logging: {
            errorMessage: EMAIL_VERIFICATION_SEND_ERROR,
            context: { userPublicId: createdUser.publicId, userEmail: createdUser.email },
          },
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_EMAIL_JOB,
        })
      }

      logger.info({ userPublicId: createdUser.publicId, fullName: createdUser.fullName }, SUCCESSFUL_USER_CREATION)

      return {
        user: {
          ...createdUser,
          profileImage: buildUserProfileImageUrl(createdUser.profileImage),
        },
      }
    } catch (error) {
      logError({ error, message: USER_CREATION_ERROR })

      // Enfileirando a restauração da imagem incorretamente persistida:
      if (registerUseCaseInput.user.profileImage) {
        try {
          fileQueue.add('move', {
            type: 'move',
            oldFilePath: buildUserProfileImagePath(registerUseCaseInput.user.profileImage),
            newFilePath: buildUserTempProfileImagePath(registerUseCaseInput.user.profileImage),
          })
        } catch (fileError) {
          logError({
            error: fileError,
            message: FAILED_TO_ENQUEUE_FILE_JOB,
          })
        }
      }

      throw error
    }
  }
}

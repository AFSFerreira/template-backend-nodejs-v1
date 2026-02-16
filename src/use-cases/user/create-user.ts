import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { CreateUserUseCaseRequest, CreateUserUseCaseResponse } from '@custom-types/use-cases/user/create-user'
import type { ApiError } from '@errors/api-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { EMAIL_VALIDATION_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { env } from '@env/index'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_VERIFICATION_SUBJECT } from '@messages/emails/user-emails'
import { EMAIL_VERIFICATION_SEND_ERROR, SUCCESSFUL_USER_CREATION } from '@messages/loggings/models/user-loggings'
import { ActivityAreaType } from '@prisma/generated/enums'
import {
  buildUserProfileImagePath,
  buildUserTempProfileImagePath,
} from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { isRegisterUserHighLevelEducation } from '@services/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@services/guards/is-register-user-high-level-student-education'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { validateInstitutionName } from '@services/validators/validate-institution-name'
import { confirmAccountHtmlTemplate } from '@templates/user/confirm-account/confirm-account-html'
import { confirmAccountTextTemplate } from '@templates/user/confirm-account/confirm-account-text'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidEmailDomainError } from '@use-cases/errors/user/invalid-email-domain-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { InvalidSecondaryEmailDomainError } from '@use-cases/errors/user/invalid-secondary-email-domain-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserWithSameIdentityDocument } from '@use-cases/errors/user/user-with-same-identity-document-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { objectDeepEqual } from '@utils/object/object-deep-equal'
import { generateToken } from '@utils/tokens/generate-token'
import { hashToken } from '@utils/tokens/hash-token'
import { hasValidMxRecord } from '@utils/validators/validate-mx-record'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { UserWithSameEmail } from '../errors/user/user-with-same-email-error'
import { UserWithSameSecondaryEmail } from '../errors/user/user-with-same-secondary-email-error'

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
    const isValidEmailDomain = await hasValidMxRecord(registerUseCaseInput.user.email)

    if (!isValidEmailDomain) {
      throw new InvalidEmailDomainError()
    }

    if (registerUseCaseInput.user.secondaryEmail) {
      const isValidSecondaryEmailDomain = await hasValidMxRecord(registerUseCaseInput.user.secondaryEmail)

      if (!isValidSecondaryEmailDomain) {
        throw new InvalidSecondaryEmailDomainError()
      }
    }

    const isHighLevelEducation =
      isRegisterUserHighLevelEducation(registerUseCaseInput) ||
      isRegisterUserHighLevelStudentEducation(registerUseCaseInput)

    const passwordHash = await hash(registerUseCaseInput.user.password, env.HASH_SALT_ROUNDS)

    const emailVerificationToken = generateToken(RANDOM_BYTES_NUMBER)
    const emailVerificationTokenHash = hashToken(emailVerificationToken)
    const emailVerificationTokenExpiresAt = new Date(Date.now() + EMAIL_VALIDATION_EXPIRATION_TIME)

    let profileImage = DEFAULT_PROFILE_IMAGE_NAME

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
            expression: userAlreadyExists.email === registerUseCaseInput.user.secondaryEmail,
            value: new UserWithSameEmail(),
          },
          {
            expression:
              !!userAlreadyExists.secondaryEmail &&
              !!registerUseCaseInput.user.secondaryEmail &&
              userAlreadyExists.secondaryEmail === registerUseCaseInput.user.secondaryEmail,
            value: new UserWithSameSecondaryEmail(),
          },
          {
            expression:
              !!registerUseCaseInput.user.secondaryEmail &&
              userAlreadyExists.email === registerUseCaseInput.user.secondaryEmail,
            value: new UserWithSameSecondaryEmail(),
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

      if (isHighLevelEducation) {
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

        // Removendo activity areas duplicadas:
        const nonRepeatingActivityAreas = activityAreas.filter(
          (activityArea, index, self) =>
            index === self.findIndex((a) => a.area === activityArea.area && a.type === activityArea.type),
        )

        const { validatedActivityAreas, success } = await validateActivityAreas({
          activityAreas: nonRepeatingActivityAreas,
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

      if (registerUseCaseInput.user.profileImage) {
        profileImage = registerUseCaseInput.user.profileImage
      }

      // Removendo elementos duplicados de keywords:
      const nonRepeatingKeywords =
        isHighLevelEducation && registerUseCaseInput.keyword
          ? Array.from<string>(new Set<string>(registerUseCaseInput.keyword))
          : undefined

      const user = await this.usersRepository.create({
        ...registerUseCaseInput,
        ...(isHighLevelEducation ? { keyword: nonRepeatingKeywords } : {}),
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

    const userProfileImagePaths = registerUseCaseInput.user.profileImage
      ? {
          oldFilePath: buildUserTempProfileImagePath(registerUseCaseInput.user.profileImage),
          newFilePath: buildUserProfileImagePath(registerUseCaseInput.user.profileImage),
        }
      : undefined

    if (userProfileImagePaths) {
      await moveFileEnqueued(userProfileImagePaths)
    }

    const emailInfo = {
      fullName: createdUser.fullName,
      email: createdUser.email,
      token: emailVerificationToken,
    }

    const { html, attachments } = confirmAccountHtmlTemplate(emailInfo)

    await sendEmailEnqueued({
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

    logger.info({ userPublicId: createdUser.publicId, fullName: createdUser.fullName }, SUCCESSFUL_USER_CREATION)

    return {
      user: {
        ...createdUser,
        profileImage: buildUserProfileImageUrl(createdUser.profileImage),
      },
    }
  }
}

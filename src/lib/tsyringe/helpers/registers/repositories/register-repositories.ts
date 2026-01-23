import type { DependencyContainer } from 'tsyringe'
import { PrismaAcademicPublicationsRepository } from '@repositories/prisma/prisma-academic-publications-repository'
import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaAddressCountriesRepository } from '@repositories/prisma/prisma-address-countries-repository'
import { PrismaAddressStatesRepository } from '@repositories/prisma/prisma-address-states-repository'
import { PrismaAddressesRepository } from '@repositories/prisma/prisma-addresses-repository'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaBlogsRepository } from '@repositories/prisma/prisma-blogs-repository'
import { PrismaDirectorBoardRepository } from '@repositories/prisma/prisma-director-board-repository'
import { PrismaDirectorPositionsRepository } from '@repositories/prisma/prisma-director-positions-repository'
import { PrismaEnrolledCoursesRepository } from '@repositories/prisma/prisma-enrolled-courses-repository'
import { PrismaInstitutionalInfoRepository } from '@repositories/prisma/prisma-institutional-info-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaKeywordsRepository } from '@repositories/prisma/prisma-keywords-repository'
import { PrismaMeetingEnrollmentsRepository } from '@repositories/prisma/prisma-meeting-enrollments-repository'
import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { PrismaNewslettersRepository } from '@repositories/prisma/prisma-newsletters-repository'
import { PrismaPaymentInfoRepository } from '@repositories/prisma/prisma-payment-info-repository'
import { PrismaSliderImagesRepository } from '@repositories/prisma/prisma-slider-images-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { registerRepository } from '../../register-repository'
import { tsyringeTokens } from '../../tokens'

export function registerRepositories(container: DependencyContainer) {
  registerRepository({
    contextKey: tsyringeTokens.repositories.academicPublications,
    container,
    target: PrismaAcademicPublicationsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.activityAreas,
    container,
    target: PrismaActivityAreasRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.addressCountries,
    container,
    target: PrismaAddressCountriesRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.addressStates,
    container,
    target: PrismaAddressStatesRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.addresses,
    container,
    target: PrismaAddressesRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.authenticationAudits,
    container,
    target: PrismaAuthenticationAuditsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.blogs,
    container,
    target: PrismaBlogsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.directorsBoard,
    container,
    target: PrismaDirectorBoardRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.directorPositions,
    container,
    target: PrismaDirectorPositionsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.enrolledCourses,
    container,
    target: PrismaEnrolledCoursesRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.institutionalInfo,
    container,
    target: PrismaInstitutionalInfoRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.institutions,
    container,
    target: PrismaInstitutionsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.keywords,
    container,
    target: PrismaKeywordsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.meetingEnrollments,
    container,
    target: PrismaMeetingEnrollmentsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.meetings,
    container,
    target: PrismaMeetingsRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.newsletters,
    container,
    target: PrismaNewslettersRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.paymentInfo,
    container,
    target: PrismaPaymentInfoRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.sliderImages,
    container,
    target: PrismaSliderImagesRepository,
  })

  registerRepository({
    contextKey: tsyringeTokens.repositories.users,
    container,
    target: PrismaUsersRepository,
  })
}

import 'reflect-metadata'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { AddressesRepository } from '@repositories/addresses-repository'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { DirectorPositionsRepository } from '@repositories/director-positions-repository'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { EnrolledCoursesRepository } from '@repositories/enrolled-courses-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { KeywordsRepository } from '@repositories/keywords-repository'
import type { MeetingParticipantsRepository } from '@repositories/meeting-participants-repository'
import type { MeetingsRepository } from '@repositories/meetings-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaAddressCountriesRepository } from '@repositories/prisma/address-countries-repository'
import { PrismaAcademicPublicationsRepository } from '@repositories/prisma/prisma-academic-publications-repository'
import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaAddressStatesRepository } from '@repositories/prisma/prisma-address-states-repository'
import { PrismaAddressesRepository } from '@repositories/prisma/prisma-addresses-repository'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaBlogsRepository } from '@repositories/prisma/prisma-blogs-repository'
import { PrismaDirectorBoardRepository } from '@repositories/prisma/prisma-director-board-repository'
import { PrismaDirectorPositionsRepository } from '@repositories/prisma/prisma-director-positions-repository'
import { PrismaEnrolledCoursesRepository } from '@repositories/prisma/prisma-enrolled-courses-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaKeywordsRepository } from '@repositories/prisma/prisma-keywords-repository'
import { PrismaMeetingParticipantsRepository } from '@repositories/prisma/prisma-meeting-participants-repository'
import { PrismaMeetingsRepository } from '@repositories/prisma/prisma-meetings-repository'
import { PrismaNewslettersRepository } from '@repositories/prisma/prisma-newsletters-repository'
import { PrismaSliderImagesRepository } from '@repositories/prisma/prisma-slider-images-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { container } from 'tsyringe'
import { tokens } from './helpers/tokens'

container.register<AcademicPublicationsRepository>(
  tokens.repositories.academicPublications,
  PrismaAcademicPublicationsRepository,
)

container.registerSingleton<ActivityAreasRepository>(tokens.repositories.activityAreas, PrismaActivityAreasRepository)

container.registerSingleton<AddressCountryRepository>(
  tokens.repositories.addressCountries,
  PrismaAddressCountriesRepository,
)

container.registerSingleton<AddressStatesRepository>(tokens.repositories.addressStates, PrismaAddressStatesRepository)

container.registerSingleton<AddressesRepository>(tokens.repositories.addresses, PrismaAddressesRepository)

container.registerSingleton<AuthenticationAuditsRepository>(
  tokens.repositories.authenticationAudits,
  PrismaAuthenticationAuditsRepository,
)

container.registerSingleton<BlogsRepository>(tokens.repositories.blogs, PrismaBlogsRepository)

container.registerSingleton<DirectorBoardRepository>(tokens.repositories.directorsBoard, PrismaDirectorBoardRepository)

container.registerSingleton<DirectorPositionsRepository>(
  tokens.repositories.directorPositions,
  PrismaDirectorPositionsRepository,
)

container.registerSingleton<EnrolledCoursesRepository>(
  tokens.repositories.enrolledCourses,
  PrismaEnrolledCoursesRepository,
)

container.registerSingleton<InstitutionsRepository>(tokens.repositories.institutions, PrismaInstitutionsRepository)

container.registerSingleton<KeywordsRepository>(tokens.repositories.keywords, PrismaKeywordsRepository)

container.registerSingleton<MeetingParticipantsRepository>(
  tokens.repositories.meetingParticipants,
  PrismaMeetingParticipantsRepository,
)

container.registerSingleton<MeetingsRepository>(tokens.repositories.meetings, PrismaMeetingsRepository)

container.registerSingleton<SliderImagesRepository>(tokens.repositories.sliderImages, PrismaSliderImagesRepository)

container.registerSingleton<NewslettersRepository>(tokens.repositories.newsletters, PrismaNewslettersRepository)

container.registerSingleton<UsersRepository>(tokens.repositories.users, PrismaUsersRepository)

// ------------------------------------------------------------------------------------------------------------------------------- //

container.registerSingleton<DatabaseContext>(tokens.infra.database, DatabaseContext)

export const tsyringeTokens = {
  repositories: {
    academicPublications: 'AcademicPublicationsRepository',
    activityAreas: 'ActivityAreasRepository',
    addressCountries: 'AddressCountriesRepository',
    addressStates: 'AddressStatesRepository',
    addresses: 'AddressesRepository',
    authenticationAudits: 'AuthenticationAuditsRepository',
    userActionAudits: 'UserActionAuditsRepository',
    blogs: 'BlogsRepository',
    institutionalInfo: 'InstitutionalInfoRepository',
    directorsBoard: 'DirectorsBoardRepository',
    directorPositions: 'DirectorPositionsRepository',
    enrolledCourses: 'EnrolledCoursesRepository',
    institutions: 'InstitutionsRepository',
    keywords: 'KeywordsRepository',
    meetings: 'MeetingsRepository',
    meetingEnrollments: 'MeetingEnrollmentsRepository',
    newsletters: 'NewslettersRepository',
    newsletterTemplates: 'NewsletterTemplatesRepository',
    paymentInfo: 'PaymentInfoRepository',
    sliderImages: 'SliderImagesRepository',
    users: 'UsersRepository',
  },

  infra: {
    database: 'DatabaseContext',
  },
} as const

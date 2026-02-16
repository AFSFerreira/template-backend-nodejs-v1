export const tsyringeTokens = {
  repositories: {
    academicPublications: 'AcademicPublicationsRepository',
    activityAreas: 'ActivityAreasRepository',
    addressCountries: 'AddressCountriesRepository',
    addressStates: 'AddressStatesRepository',
    addresses: 'AddressesRepository',
    authenticationAudits: 'AuthenticationAuditsRepository',
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
    paymentInfo: 'PaymentInfoRepository',
    sliderImages: 'SliderImagesRepository',
    users: 'UsersRepository',
  },

  infra: {
    database: 'DatabaseContext',
  },

  presenters: {
    user: {
      userDefault: 'user:default',
      userDetailed: 'user:detailed',
      userDetailedForAdmin: 'user:detailed-for-admin',
      userSimplified: 'user:simplified',
      userSimplifiedForAdmin: 'user:simplified-for-admin',
    },

    academicPublication: {
      academicPublicationDefault: 'academic-publication:default',
      academicPublicationSimplified: 'academic-publication:simplified',
      academicPublicationYear: 'academic-publication:year',
    },

    activityArea: {
      activityAreaDefault: 'activity-area:default',
      activityAreaWithBlogsCount: 'activity-area:with-blogs-count',
    },

    address: {
      addressDefault: 'address:default',
      addressWithUsersCount: 'address:users-count',
    },

    blog: {
      blogDefault: 'blog:default',
      blogSimplified: 'blog:simplified',
      blogDetailed: 'blog:detailed',
      blogDetailedForAdmin: 'blog:detailed-for-admin',
      blogDetailedWithContent: 'blog:detailed-with-content',
    },

    directorBoard: {
      directorBoardDefault: 'director-board:default',
      directorBoardWithUser: 'director-board:with-user',
      directorBoardWithUserForAdmin: 'director-board:with-user-admin',
    },

    institutionalInfo: {
      institutionalInfoDefault: 'institutional-info:default',
      institutionalInfoForAdmin: 'institutional-info:for-admin',
    },

    paymentInfo: {
      paymentInfoDefault: 'payment-info:default',
    },

    directorPosition: {
      directorPositionDefault: 'director-position:default',
    },

    institution: {
      institutionDefault: 'institution:default',
      institutionWithUsersCount: 'institution:with-users-count',
    },

    meeting: {
      meetingDefault: 'meeting:default',
      meetingDetailed: 'meeting:detailed',
    },

    meetingEnrollment: {
      meetingEnrollmentDefault: 'meeting-enrollment:default',
      meetingEnrollmentDetailed: 'meeting-enrollment:detailed',
      meetingEnrollmentDetailedWithPresentation: 'meeting-enrollment:detailed-with-presentation',
    },

    newsletter: {
      newsletterDefault: 'newsletter:default',
    },

    sliderImage: {
      sliderImageDefault: 'slider-image:default',
      sliderImageHomePage: 'slider-image:home-page',
    },

    dashboardMetrics: {
      dashboardMetricsDefault: 'dashboard-metrics:default',
      dashboardMetricsBlogs: 'dashboard-metrics:blogs',
      dashboardMetricsUsers: 'dashboard-metrics:users',
      dashboardMetricsNewsletters: 'dashboard-metrics:newsletters',
    },

    file: {
      fileDefault: 'file:default',
    },
  },
} as const

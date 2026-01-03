export const tokens = {
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
    sliderImages: 'SliderImagesRepository',
    users: 'UsersRepository',
  },
  infra: {
    database: 'DatabaseContext',
  },
  presenters: {
    // User
    userDefault: 'user:default',
    userDetailed: 'user:detailed',
    userDetailedForAdmin: 'user:detailed-for-admin',
    userSimplified: 'user:simplified',

    // Academic Publication
    academicPublicationDefault: 'academic-publication:default',
    academicPublicationSimplified: 'academic-publication:simplified',

    // Activity Area
    activityAreaDefault: 'activity-area:default',

    // Address
    addressDefault: 'address:default',
    addressWithUsersCount: 'address:users-count',

    // Blog
    blogDefault: 'blog:default',
    blogSimplified: 'blog:simplified',
    blogDetailed: 'blog:detailed',
    blogDetailedForAdmin: 'blog:detailed-for-admin',
    blogDetailedWithContent: 'blog:detailed-with-content',

    // Director Board
    directorBoardDefault: 'director-board:default',
    directorBoardWithUser: 'director-board:with-user',
    directorBoardWithUserForAdmin: 'director-board:with-user-admin',

    // Institutional Info
    institutionalInfoDefault: 'institutional-info:default',

    // Director Position
    directorPositionDefault: 'director-position:default',

    // Institution
    institutionDefault: 'institution:default',
    institutionWithUsersCount: 'institution:with-users-count',

    // Meeting
    meetingDefault: 'meeting:default',
    meetingDetailed: 'meeting:detailed',

    // Meeting Enrollment
    meetingEnrollmentDefault: 'meeting-enrollment:default',
    meetingEnrollmentDetailed: 'meeting-enrollment:detailed',
    meetingEnrollmentDetailedWithPresentation: 'meeting-enrollment:detailed-with-presentation',

    // Newsletter
    newsletterDefault: 'newsletter:default',

    // Slider Image
    sliderImageDefault: 'slider-image:default',
    sliderImageHomePage: 'slider-image:home-page',

    // Dashboard Metrics
    dashboardMetricsDefault: 'dashboard-metrics:default',
    dashboardMetricsBlogs: 'dashboard-metrics:blogs',
    dashboardMetricsUsers: 'dashboard-metrics:users',
    dashboardMetricsNewsletters: 'dashboard-metrics:newsletters',
  },
}

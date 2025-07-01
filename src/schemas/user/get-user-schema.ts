import { YEAR_MONTH_REGEX } from '@/constants/regex'
import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'

export const getUserSchemaItem = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', minLength: 6 },
    fullName: { type: 'string', minLength: 5 },
    username: { type: 'string', minLength: 5 },
    birthDate: { type: 'string', format: 'date' },
    lattesCVLink: { type: 'string', format: 'uri' },
    profileGSLink: { type: 'string', format: 'uri' },
    profileRIDLink: { type: 'string', format: 'uri' },
    orcidNumber: { type: 'string' },
    institutionName: { type: 'string' },
    departmentName: { type: 'string' },
    institutionComplement: { type: 'string' },
    occupation: {
      type: 'string',
      enum: Object.values(OCCUPATION),
    },
    educationLevel: {
      type: 'string',
      enum: Object.values(EDUCATION_LEVEL),
    },
    identityType: {
      type: 'string',
      enum: Object.values(IDENTITY_TYPE),
    },
    identityDocument: { type: 'string' },
    emailIsPublic: { type: 'boolean' },
    astrobiologyOrRelatedStartYear: { type: 'number' },
    interestDescription: { type: 'string', maxLength: 2000 },
    receiveReports: { type: 'boolean' },
    publicInformation: { type: 'string' },
    mainAreaActivity: { type: 'string' },
    specificActivity: { type: 'string' },
    specificActivityDescription: { type: 'string' },
    keywords: {
      type: 'array',
      items: { type: 'string' },
      maxItems: 4,
    },
    postalCode: { type: 'string' },
    country: { type: 'string' },
    state: { type: 'string' },
    city: { type: 'string' },
    neighborhood: { type: 'string' },
    street: { type: 'string' },
    houseNumber: { type: 'string' },
    courseName: { type: 'string' },
    startGraduationDate: {
      type: 'string',
      pattern: `${YEAR_MONTH_REGEX}`.slice(1, -1),
    },
    expectedGraduationDate: {
      type: 'string',
      pattern: `${YEAR_MONTH_REGEX}`.slice(1, -1),
    },
    supervisorName: { type: 'string' },
    scholarshipHolder: { type: 'boolean' },
    sponsoringOrganization: { type: 'string' },
    academicPublications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          authors: { type: 'string' },
          publicationDate: { type: 'string', format: 'date' },
          journalName: { type: 'string' },
          volume: { type: 'string' },
          editionNumber: { type: 'string' },
          pageInterval: { type: 'string' },
          doiLink: { type: 'string' },
        },
        required: [
          'title',
          'authors',
          'publicationDate',
          'journalName',
          'volume',
          'editionNumber',
          'pageInterval',
          'doiLink',
        ],
      },
      maxItems: 5,
    },
  },
  required: [
    'email',
    'fullName',
    'username',
    'birthDate',
    'institutionName',
    'occupation',
    'educationLevel',
    'identityType',
    'identityDocument',
    'emailIsPublic',
    'astrobiologyOrRelatedStartYear',
    'interestDescription',
    'receiveReports',
    'publicInformation',
    'mainAreaActivity',
    'specificActivity',
    'keywords',
    'postalCode',
    'country',
    'state',
    'city',
    'neighborhood',
    'street',
    'houseNumber',
    'startGraduationDate',
    'expectedGraduationDate',
    'scholarshipHolder',
    'academicPublications',
  ],
}

export const getUserSchema = {
  tags: ['users'],
  summary: 'Get a paginated list of users',
  description:
    'Retrieve a paginated list of all users with their complete information',
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number for pagination',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'Number of users per page',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: getUserSchemaItem,
        },
        pagination: {
          type: 'object',
          properties: {
            currentPage: { type: 'integer' },
            totalPages: { type: 'integer' },
            totalUsers: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            hasPreviousPage: { type: 'boolean' },
          },
          required: [
            'currentPage',
            'totalPages',
            'totalUsers',
            'hasNextPage',
            'hasPreviousPage',
          ],
        },
      },
      required: ['users', 'pagination'],
      description: 'Paginated list of users',
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Bad request - invalid query parameters',
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Unauthorized - authentication required',
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Forbidden - insufficient permissions',
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Internal server error',
    },
  },
}

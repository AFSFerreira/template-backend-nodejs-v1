// import { YEAR_MONTH_REGEX } from '@/constants/regex'
// import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'

// WARNING: Mudar posteriormente de objeto literal para conversão de schema zod
// com zod-to-json.
// NOTE: Revisar e reoganizar os corpos de response posteriormente
export const getUserJsonSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    fullName: { type: 'string', minLength: 5 },
    username: { type: 'string', minLength: 5 },
    birthDate: { type: 'string', format: 'date-time' },
    profileImagePath: { type: 'string' },
    lattesCVLink: { type: 'string', format: 'uri' },
    profileGSLink: { type: 'string', format: 'uri' },
    profileRIDLink: { type: ['string', 'null'], format: 'uri' },
    orcidNumber: { type: 'string' },
    membershipStatus: { type: 'string' },
    userRole: { type: 'string' },
    institutionName: { type: 'string' },
    departmentName: { type: ['string', 'null'] },
    institutionComplement: { type: ['string', 'null'] },
    occupation: { type: 'string' },
    educationLevel: { type: 'string' },
    identityType: { type: 'string' },
    identityDocument: { type: 'string' },
    emailIsPublic: { type: 'boolean' },
    astrobiologyOrRelatedStartYear: { type: 'number' },
    interestDescription: { type: 'string', maxLength: 2000 },
    receiveReports: { type: 'boolean' },
    publicInformation: { type: 'string' },
    specificActivity: { type: 'string' },
    specificActivityDescription: { type: ['string', 'null'] },
    email: { type: 'string', format: 'email', minLength: 6 },
    passwordDigest: { type: 'string' },
    loginAttempts: { type: 'number' },
    lastLogin: { type: 'string', format: 'date-time' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    activityAreaId: { type: 'string', format: 'uuid' },
  },
  required: [
    'id',
    'fullName',
    'username',
    'birthDate',
    'profileImagePath',
    'lattesCVLink',
    'profileGSLink',
    'orcidNumber',
    'membershipStatus',
    'userRole',
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
    'specificActivity',
    'email',
    'passwordDigest',
    'loginAttempts',
    'lastLogin',
    'createdAt',
    'updatedAt',
    'activityAreaId',
  ],
}

export const getUserSwaggerSchema = {
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
          items: getUserJsonSchema,
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

export const getUserSwaggerSchemaTranslated = {
  tags: ['users'],
  summary: 'Obter lista paginada de usuários',
  description:
    'Recuperar uma lista paginada de todos os usuários com suas informações completas',
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Número da página para paginação',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'Número de usuários por página',
      },
      search: {
        type: 'string',
        description:
          'Termo de busca para filtrar usuários por nome, email ou nome de usuário',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: getUserJsonSchema,
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
      description: 'Lista paginada de usuários',
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Requisição inválida - parâmetros de consulta inválidos',
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Não autorizado - autenticação obrigatória',
    },
    403: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Proibido - permissões insuficientes',
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      description: 'Erro interno do servidor',
    },
  },
}

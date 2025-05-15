export const tsyringeTokens = {
  repositories: {
    authenticationAudits: 'AuthenticationAuditsRepository',
    userActionAudits: 'UserActionAuditsRepository',
    users: 'UsersRepository',
  },

  infra: {
    database: 'DatabaseContext',
  },

  providers: {
    redis: 'Redis',
  },

  presenters: {
    users: {
      simplified: 'user:simplified',
      default: 'user:default',
      detailed: 'user:detailed',
      detailedForAdmin: 'user:detailed-for-admin',
    },
  },
} as const

export const bullmqTokens = {
  queues: {
    user: {
      emails: 'user-email-queue',
      security: 'user-security-jobs',
    },
    schedulers: {
      databaseTasks: 'database-tasks-queue',
    },
  },

  tasks: {
    email: 'send-email',
    security: {
      upgradePasswordHash: 'upgrade-password-hash',
      incrementLoginAttempts: 'increment-login-attempts',
      resetLoginAttempts: 'reset-login-attempts',
      setLastLogin: 'set-last-login',
      createAuthenticationAudit: 'create-authentication-audit',
    },
  },

  cron: {
    databaseTasks: {
      auditCleanup: 'cleanup-audits',
      userActionAuditCleanup: 'cleanup-user-action-audits',
    },
  },
} as const

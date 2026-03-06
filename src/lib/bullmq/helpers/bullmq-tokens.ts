export const bullmqTokens = {
  queues: {
    user: {
      emails: 'user-email-queue',
      security: 'user-security-jobs',
    },
    files: {
      management: 'management-file-queue',
    },
    schedulers: {
      fileTasks: 'file-tasks-queue',
      databaseTasks: 'database-tasks-queue',
    },
  },

  tasks: {
    email: 'send-email',
    file: {
      copy: 'copy-file',
      delete: 'delete-file',
      move: 'move-file',
    },
    security: {
      upgradePasswordHash: 'upgrade-password-hash',
      incrementLoginAttempts: 'increment-login-attempts',
      resetLoginAttempts: 'reset-login-attempts',
      setLastLogin: 'set-last-login',
      createAuthenticationAudit: 'create-authentication-audit',
    },
  },

  cron: {
    fileTasks: {
      emptyFoldersCleanup: 'erase-empty-folders',
      tempImagesCleanup: 'erase-temp-images',
    },
    databaseTasks: {
      auditCleanup: 'cleanup-audits',
      userActionAuditCleanup: 'cleanup-user-action-audits',
      verifyingUsersCleanup: 'cleanup-verifying-users',
    },
  },
} as const

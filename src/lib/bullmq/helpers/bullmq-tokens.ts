export const bullmqTokens = {
  queues: {
    emails: {
      user: 'userEmailQueue',
    },
    files: {
      management: 'managementFileQueue',
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
  },

  cron: {
    fileTasks: {
      emptyFoldersCleanup: 'erase-empty-folders',
      tempImagesCleanup: 'erase-temp-images',
    },
    databaseTasks: {
      auditCleanup: 'cleanup-audits',
      userActionAuditCleanup: 'cleanup-user-action-audits',
    },
  },
} as const

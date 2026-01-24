export const bullmqTokens = {
  emails: {
    user: 'userEmailQueue',
  },
  files: {
    management: 'managementFileQueue',
  },
  tasksNames: {
    email: 'send-email',
    file: {
      copy: 'copy-file',
      delete: 'delete-file',
      move: 'move-file',
    },
  },
} as const

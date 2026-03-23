import type { FileJobLogging } from '@custom-types/custom/file-job-logging'
import type { SendEmailRequest } from '@custom-types/lib/node-mailer/send-email-request-type'

export type EmailJobData = SendEmailRequest & FileJobLogging

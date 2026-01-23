import type { EmailJobData } from '@custom-types/jobs/queues/definitions/email-queue'
import type { Job } from 'bullmq'
import { logger } from '@lib/logger'
import { sendEmail } from '@services/external/send-email'

export async function emailProcessor(job: Job<EmailJobData>) {
  logger.info(`[Job ${job.id}] Iniciando envio de email '${job.data.subject}'...`)

  await sendEmail(job.data)

  logger.info(`[Job ${job.id}] Email '${job.data.subject}' enviado com sucesso!`)
}

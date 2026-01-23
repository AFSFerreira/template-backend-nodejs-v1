import type { Worker } from 'bullmq'
import { emailWorker } from '@jobs/queues/workers/email-worker'
import { fileWorker } from '@jobs/queues/workers/file-worker'

// NOTE: Manter esse array atualizado com todos os workers
// do projeto para desligá-los no graceful shutdown:
export const workers: Worker[] = [emailWorker, fileWorker]

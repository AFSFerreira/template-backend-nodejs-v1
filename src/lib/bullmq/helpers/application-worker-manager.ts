import type { WorkerEntry } from '@custom-types/lib/bullmq/worker-entry'
import type { Queue, Worker } from 'bullmq'
import { emailQueue } from '@jobs/queues/definitions/email-queue'
import { securityQueue } from '@jobs/queues/definitions/security-queue'
import { emailWorker } from '@jobs/queues/workers/email-worker'
import { securityWorker } from '@jobs/queues/workers/security-worker'
import { logger } from '@lib/pino'

export class ApplicationWorkerManager {
  private entries: WorkerEntry[] = []

  constructor() {
    this.register(emailWorker, emailQueue)
    this.register(securityWorker, securityQueue)
  }

  private register(worker: Worker, queue: Queue): void {
    this.entries.push({ worker, queue })
  }

  async closeAll(): Promise<void> {
    logger.info('[ApplicationWorkerManager] Encerrando todos os Workers e Filas...')

    await Promise.all(this.entries.flatMap(({ worker, queue }) => [worker.close(), queue.close()]))
  }
}

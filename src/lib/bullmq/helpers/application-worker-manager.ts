import type { Queue, Worker } from 'bullmq'
import { emailQueue } from '@jobs/queues/definitions/email-queue'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { emailWorker } from '@jobs/queues/workers/email-worker'
import { fileWorker } from '@jobs/queues/workers/file-worker'
import { logger } from '@lib/logger'

interface WorkerEntry {
  worker: Worker
  queue: Queue
}

export class ApplicationWorkerManager {
  private entries: WorkerEntry[] = []

  constructor() {
    this.register(emailWorker, emailQueue)
    this.register(fileWorker, fileQueue)
  }

  private register(worker: Worker, queue: Queue): void {
    this.entries.push({ worker, queue })
  }

  async closeAll(): Promise<void> {
    logger.info('[ApplicationWorkerManager] Encerrando todos os Workers e Filas...')

    await Promise.all(this.entries.flatMap(({ worker, queue }) => [worker.close(), queue.close()]))
  }
}

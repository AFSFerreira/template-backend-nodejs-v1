import type { JobContext } from '@custom-types/lib/bullmq/job-context'
import type { JobFactory } from '@custom-types/lib/bullmq/job-factory'
import type { JobFactoryContext } from '@custom-types/lib/bullmq/job-factory-context'
import type { ScalableTaskOptions } from '@custom-types/lib/bullmq/scalable-task-options'
import type { SchedulerOptions } from '@custom-types/lib/bullmq/scheduler-options'
import type { Job, WorkerOptions } from 'bullmq'
import { BASE_JOB_QUEUE_CONFIGURATION, BASE_JOB_WORKER_CONFIGURATION } from '@constants/jobs-configuration-constants'
import { logError } from '@lib/pino/helpers/log-error'
import { cronSchema } from '@lib/zod/utils/generic-components/cron-schema'
import {
  JOB_STARTED_SUCESSFUL,
  RUNNING_SCHEDULED_JOB,
  SCHEDULER_JOB_ACTIVE,
  SCHEDULER_JOB_COMPLETED,
  SCHEDULER_JOB_PROCESSING_FAILED,
  SCHEDULER_JOB_STALLED,
  SCHEDULER_WORKER_ERROR,
} from '@messages/loggings/system/scheduler-loggings'
import { InvalidCronExpressionError } from '@utils/errors/cron/invalid-cron-expression-error'
import { JobNameAlreadyExistsError } from '@utils/errors/jobs/job-name-already-exists-error'
import { Queue, Worker } from 'bullmq'
import z from 'zod'
import { BASIC_JOB_CONFIGURATION } from '../configuration/base-configuration'

export class SchedulerManager {
  private queue: Queue
  private worker: Worker
  private factories: Map<string, JobFactoryContext>
  private jobsContext: JobContext

  // Métricas:
  // private metricsCtx: MetricsContext
  // private runCounter?: Counter<string>
  // private errorCounter?: Counter<string>

  constructor(options: SchedulerOptions) {
    this.factories = new Map<string, JobFactoryContext>()

    this.jobsContext = options.jobsContext

    const connection = options.redis

    this.queue = new Queue(options.queueName, {
      connection,
      defaultJobOptions: BASE_JOB_QUEUE_CONFIGURATION,
    })

    const workerOptions: WorkerOptions = {
      ...BASE_JOB_WORKER_CONFIGURATION,
      connection,
    }

    this.worker = new Worker(options.queueName, async (job: Job) => this.processJob(job), workerOptions)

    // if (options.promContext) {
    //   this.metricsCtx = { metricsClient: options.promContext.client, metricsPrefix: options.promContext.prefix ?? 'scheduler' }
    //   this.initMetrics()
    // }

    this.setupWorkerEvents()
  }

  // private initMetrics() {
  //   this.runCounter = new this.metricsCtx.metricsClient.Counter({
  //     name: `${this.metricsCtx.metricsPrefix}_runs_total`,
  //     help: 'Total scheduler runs',
  //     labelNames: ['job'],
  //   })

  //   this.errorCounter = new this.metricsCtx.metricsClient.Counter({
  //     name: `${this.metricsCtx.metricsPrefix}_errors_total`,
  //     help: 'Total scheduler errors',
  //     labelNames: ['job'],
  //   })
  // }

  register(jobName: string, cronExpr: string, factory: JobFactory, options?: ScalableTaskOptions) {
    const isValidCron = cronSchema.safeParse(cronExpr)

    if (!isValidCron.success) {
      throw new InvalidCronExpressionError(z.treeifyError(isValidCron.error).errors)
    }

    if (this.factories.has(jobName)) {
      throw new JobNameAlreadyExistsError(jobName)
    }

    this.factories.set(jobName, {
      cronExpr,
      factory,
      options: {
        ...BASIC_JOB_CONFIGURATION,
        ...options,
      },
    })

    this.jobsContext.logger?.info(`[SchedulerManager] Job ${jobName} registrado -> ${cronExpr}`)
  }

  async startAll() {
    this.jobsContext.logger?.info('[SchedulerManager] Iniciando todas as tarefas...')

    await this.clearOrphanRepeatableJobs()

    for (const [name, { cronExpr, options }] of this.factories.entries()) {
      await this.queue.add(
        name,
        {},
        {
          ...options,
          repeat: {
            pattern: cronExpr,
            tz: options.timezone,
          },
        },
      )

      this.jobsContext.logger?.info({ job: name, cronExpr }, JOB_STARTED_SUCESSFUL)
    }
  }

  private async processJob(job: Job) {
    const context = this.factories.get(job.name)

    if (!context) {
      throw new Error(`Nenhuma factory encontrada para o job: ${job.name}`)
    }

    this.jobsContext.logger?.info({ job: job.name, jobId: job.id }, RUNNING_SCHEDULED_JOB)

    const jobFn = context.factory(this.jobsContext)

    await jobFn()
  }

  private setupWorkerEvents() {
    this.worker.on('active', (job) => {
      this.jobsContext.logger?.info({ job: job.name, jobId: job.id }, SCHEDULER_JOB_ACTIVE)
    })

    this.worker.on('completed', (job) => {
      this.jobsContext.logger?.info({ job: job.name, jobId: job.id }, SCHEDULER_JOB_COMPLETED)
    })

    this.worker.on('failed', (job, error) => {
      logError({
        context: {
          job: job?.name,
          jobId: job?.id,
          error: error.message,
        },
        error,
        message: SCHEDULER_JOB_PROCESSING_FAILED,
      })
    })

    this.worker.on('stalled', (jobId) => {
      this.jobsContext.logger?.warn({ jobId }, SCHEDULER_JOB_STALLED)
    })

    this.worker.on('error', (error) => {
      logError({ error, message: SCHEDULER_WORKER_ERROR })
    })
  }

  async stopAll() {
    this.jobsContext.logger?.info('[SchedulerManager] Parando todas as tarefas...')

    await this.worker.close()
    await this.queue.close()

    this.jobsContext.logger?.info('[SchedulerManager] Scheduler encerrado com segurança.')
  }

  private async clearOrphanRepeatableJobs() {
    const repeatableJobs = await this.queue.getJobSchedulers()

    for (const job of repeatableJobs) {
      const registeredJob = this.factories.get(job.name)

      // O job foi removido do código-fonte (não existe mais no Map)
      const isOrphanByName = !registeredJob

      // O job existe no código, mas a expressão cron (ou timezone) foi alterada.
      const isOrphanByPattern =
        registeredJob && (registeredJob.cronExpr !== job.pattern || registeredJob.options.timezone !== job.tz)

      if (isOrphanByName || isOrphanByPattern) {
        await this.queue.removeJobScheduler(job.key)
        this.jobsContext.logger?.warn(`[SchedulerManager] Removido job órfão: ${job.name}`)
      }
    }
  }

  status() {
    return {
      workerRunning: this.worker.isRunning,
      registeredJobs: Array.from(this.factories.keys()),
    }
  }
}

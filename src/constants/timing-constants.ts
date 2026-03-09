import ms from 'ms'

export const RECOVERY_PASSWORD_EXPIRATION_TIME = ms('15m')
export const EMAIL_VALIDATION_EXPIRATION_TIME = ms('7d')
export const EMAIL_CHANGE_EXPIRATION_TIME = ms('1d')

export const VERIFYNG_ACCOUNT_ERASE_TIME_WINDOW = EMAIL_VALIDATION_EXPIRATION_TIME - ms('1d')

export const CORS_MAX_AGE = ms('2h') / 1000

export const SMTP_CONNECTION_TIMEOUT = ms('10s')
export const SMTP_GREETING_TIMEOUT = ms('5s')
export const SMTP_SOCKET_TIMEOUT = ms('20s')

export const SENTRY_CLOSE_TIMEOUT = ms('2s')

export const AVERAGE_CRON_JOB_TIME_EXECUTION = ms('10m')

export const BATCH_PROCESSING_DELAY = ms('1s')

export const PAGE_VIEW_DEDUPLICATION_TTL = ms('24h')

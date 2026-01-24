import ms from 'ms'

export const RECOVERY_PASSWORD_EXPIRATION_TIME = ms('15m')
export const EMAIL_VALIDATION_EXPIRATION_TIME = ms('3d')

export const CORS_MAX_AGE = ms('2h') / 1000

export const SMTP_CONNECTION_TIMEOUT = ms('10s')
export const SMTP_GREETING_TIMEOUT = ms('5s')
export const SMTP_SOCKET_TIMEOUT = ms('20s')

export const SENTRY_CLOSE_TIMEOUT = ms('2s')

export const AVERAGE_CRON_JOB_TIME_EXECUTION = ms('10m')

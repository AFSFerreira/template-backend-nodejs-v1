import ms from 'ms'

export const RECOVERY_PASSWORD_EXPIRATION_TIME = ms('15m')

export const BLOG_IP_VIEW_TTL = ms('10m')
export const BLOG_HTML_CACHE_TTL = ms('3m')

export const CORS_MAX_AGE = ms('2h') / 1000

export const SMTP_CONNECTION_TIMEOUT = ms('10s')
export const SMTP_GREETING_TIMEOUT = ms('5s')
export const SMTP_SOCKET_TIMEOUT = ms('20s')

export const TEMP_PROFILE_IMAGES_TTL_IN_MS = ms('1d')

export const SENTRY_CLOSE_TIMEOUT = ms('2s')

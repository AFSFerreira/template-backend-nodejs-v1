export const LANGUAGE_OPTIONS = ['en', 'pt'] as const

export type TranslationLanguageType = (typeof LANGUAGE_OPTIONS)[number]

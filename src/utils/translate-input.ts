import type { TranslationLanguageType } from '@custom-types/translation-language-type'

type TransCbType<TInput, TOutput> = (v: TInput) => TOutput

export function translateInput<TInputPt, TInputEn, TOutput>(
  value: string,
  lang: TranslationLanguageType,
  ptTransCb: TransCbType<TInputPt, TOutput>,
  enTransCb: TransCbType<TInputEn, TOutput>,
): TOutput {
  switch (lang) {
    case 'pt':
      return ptTransCb(value as TInputPt)
    case 'en':
      return enTransCb(value as TInputEn)
  }
}

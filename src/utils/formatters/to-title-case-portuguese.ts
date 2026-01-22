import { TITLE_CASE_PORTUGUESE_EXCEPTIONS } from '@constants/arrays'

export function toTitleCasePortuguese(input: string) {
  if (!input) return ''

  return input
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !TITLE_CASE_PORTUGUESE_EXCEPTIONS.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }

      return word
    })
    .join(' ')
}

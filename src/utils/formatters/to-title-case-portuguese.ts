import { TITLE_CASE_PORTUGUESE_EXCEPTIONS } from '@constants/arrays'

/**
 * Converte uma string para Title Case respeitando as regras gramaticais do português.
 *
 * A primeira palavra sempre é capitalizada. Palavras subsequentes são capitalizadas apenas
 * se não estiverem na lista de exceções do português (artigos, preposições e conjunções como
 * "de", "da", "do", "e", "em", etc.).
 *
 * @param input - String a ser convertida.
 * @returns String convertida em Title Case, ou string vazia se o input for falsy.
 *
 * @example
 * toTitleCasePortuguese('universidade de são paulo')      // 'Universidade de São Paulo'
 * toTitleCasePortuguese('SOCIEDADE BRASILEIRA DE COISAS') // 'Sociedade Brasileira de Coisas'
 * toTitleCasePortuguese('')                                // ''
 */
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

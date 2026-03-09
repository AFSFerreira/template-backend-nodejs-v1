/**
 * Seleciona um elemento aleatório de um array.
 *
 * Utiliza `Math.random()` para gerar um índice aleatório. Não deve ser utilizado
 * para fins criptográficos ou de segurança.
 *
 * @typeParam T - Tipo dos elementos do array.
 * @param array - Array de onde selecionar o elemento (não deve estar vazio).
 * @returns Elemento selecionado aleatoriamente.
 *
 * @example
 * getRandomArrayElement(['a', 'b', 'c']) // 'b' (aleatório)
 * getRandomArrayElement([1, 2, 3, 4, 5]) // 3 (aleatório)
 */
export function getRandomArrayElement<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length)

  const selectedItem = array[randomIndex]

  return selectedItem
}

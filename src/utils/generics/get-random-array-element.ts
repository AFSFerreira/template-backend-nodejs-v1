export function getRandomArrayElement<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length)

  const selectedItem = array[randomIndex]

  return selectedItem
}

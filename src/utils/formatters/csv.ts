import { Parser } from 'json2csv'

/**
 * Converte um array de objetos genéricos em uma string CSV.
 *
 * Utiliza a biblioteca `json2csv` para serializar os dados. Os nomes das propriedades
 * dos objetos são utilizados como cabeçalhos das colunas.
 *
 * @typeParam T - Tipo dos objetos do array (deve ser readonly).
 * @param data - Array de objetos a serem convertidos.
 * @returns String CSV formatada com cabeçalhos e linhas.
 *
 * @example
 * toCsv([{ nome: 'João', idade: 30 }, { nome: 'Maria', idade: 25 }])
 * // '"nome","idade"\n"João",30\n"Maria",25'
 */
export function toCsv<T extends Readonly<T>>(data: T[]): string {
  const parser = new Parser()
  return parser.parse(data)
}

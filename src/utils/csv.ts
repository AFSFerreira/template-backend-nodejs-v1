import { Parser } from 'json2csv'

export function toCsv<T>(data: T[]): string {
  const parser = new Parser()

  return parser.parse(data)
}

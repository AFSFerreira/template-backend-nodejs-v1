import { SQL_IDENTIFIER_REGEX } from '@constants/regex-constants'

export function isValidSqlIdentifier(identifier: string) {
  return SQL_IDENTIFIER_REGEX.test(identifier)
}

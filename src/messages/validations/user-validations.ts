import { MAX_PASSWORD_SIZE, MIN_PASSWORD_SIZE } from '@constants/validation-constants'

export const INVALID_INNER_SPACES = 'Este campo não pode conter espaços'

export const INVALID_AUTHENTICATION_INPUT = 'Erro de autenticação: formato de e-mail, nome de usuário ou senha inválido'

export const PASSWORD_TOO_SHORT = `A senha deve ter pelo menos ${MIN_PASSWORD_SIZE} caracteres`

export const PASSWORD_TOO_LONG = `A senha deve ter no máximo ${MAX_PASSWORD_SIZE} caracteres`

export const PASSWORD_UPPERCASE = 'A senha deve conter pelo menos uma letra maiúscula'

export const PASSWORD_DIGIT = 'A senha deve conter pelo menos um número'

export const PASSWORD_SPECIAL_CHARACTER = 'A senha deve conter pelo menos um caractere especial'

export const INVALID_DATE_RANGE = 'Data inválida (intervalo muito grande)'

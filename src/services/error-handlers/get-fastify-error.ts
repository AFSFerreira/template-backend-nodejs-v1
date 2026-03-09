import type { IApiResponse } from '@custom-types/responses/api-response'
import type { FastifyError } from 'fastify'
import {
  BODY_REQUIRED,
  INVALID_BODY_FORMAT_JSON,
  MAX_MULTIPART_FILE_SIZE_LIMIT,
} from '@messages/responses/common-responses/4xx'
import { INTERNAL_SERVER_ERROR } from '@messages/responses/common-responses/5xx'

/**
 * Mapeia códigos de erro específicos do Fastify para respostas HTTP padronizadas.
 *
 * Erros tratados:
 * - `FST_ERR_CTP_EMPTY_JSON_BODY` → Body obrigatório.
 * - `FST_ERR_CTP_INVALID_JSON_BODY` → Formato JSON inválido.
 * - `FST_ERR_CTP_MULTIPART_FILE_SIZE_LIMIT` → Limite de tamanho de arquivo excedido.
 * - Demais → 500 Internal Server Error.
 *
 * @param error - Erro do Fastify com propriedade `code`.
 * @returns Resposta HTTP padronizada.
 */
export function getFastifyError(error: FastifyError): IApiResponse {
  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    return BODY_REQUIRED
  }

  if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    return INVALID_BODY_FORMAT_JSON
  }

  if (error.code === 'FST_ERR_CTP_MULTIPART_FILE_SIZE_LIMIT') {
    return MAX_MULTIPART_FILE_SIZE_LIMIT
  }

  return INTERNAL_SERVER_ERROR
}

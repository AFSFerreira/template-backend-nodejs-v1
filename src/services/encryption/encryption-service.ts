import type { EncryptedData } from '@custom-types/services/hashes/encrypted-data'
import crypto from 'node:crypto'
import { env } from '@env/index'
import { logError } from '@lib/pino/helpers/log-error'
import { DecryptionFailedError } from '@use-cases/errors/generic/decryption-failed-error'

const ALGORITHM = 'aes-256-gcm'
const SECRET_KEY_BUFFER = Buffer.from(env.ENCRYPTION_KEY, 'base64')

const IV_HEX_LENGTH = 32
const AUTH_TAG_HEX_LENGTH = 32

/**
 * Serviço de criptografia simétrica baseado em AES-256-GCM.
 *
 * Utiliza Initialization Vector (IV) aleatório de 16 bytes e Authentication Tag
 * para garantir confidencialidade e integridade dos dados.
 *
 * O payload criptografado é uma string hexadecimal no formato:
 * `[IV (32 hex chars)][AuthTag (32 hex chars)][CipherText]`
 */
export class EncryptionService {
  /**
   * Criptografa uma string usando AES-256-GCM com IV aleatório.
   *
   * @param input - Texto plano a ser criptografado.
   * @returns Payload criptografado no formato `IV + AuthTag + CipherText` (hexadecimal).
   */
  static encrypt(input: string): EncryptedData {
    const initializationVector = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY_BUFFER, initializationVector)

    let encrypted = cipher.update(input, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag().toString('hex')
    const initializationVectorHex = initializationVector.toString('hex')

    return `${initializationVectorHex}${authTag}${encrypted}` as EncryptedData
  }

  /**
   * Descriptografa um payload criptografado pelo método {@link EncryptionService.encrypt}.
   *
   * Extrai IV e AuthTag do prefixo hex para validar autenticidade e decifrar o conteúdo.
   *
   * @param encryptedPayload - String hexadecimal no formato `IV + AuthTag + CipherText`.
   * @returns Texto plano original.
   * @throws {DecryptionFailedError} Se o payload for inválido ou a autenticação falhar.
   */
  static decrypt(encryptedPayload: string | EncryptedData): string {
    if (encryptedPayload.length < IV_HEX_LENGTH + AUTH_TAG_HEX_LENGTH) {
      throw new DecryptionFailedError()
    }

    const initializationVectorHex = encryptedPayload.substring(0, IV_HEX_LENGTH)

    const authTagHex = encryptedPayload.substring(IV_HEX_LENGTH, IV_HEX_LENGTH + AUTH_TAG_HEX_LENGTH)

    const encryptedText = encryptedPayload.substring(IV_HEX_LENGTH + AUTH_TAG_HEX_LENGTH)

    try {
      const decipher = crypto.createDecipheriv(
        ALGORITHM,
        SECRET_KEY_BUFFER,
        Buffer.from(initializationVectorHex, 'hex'),
      )

      decipher.setAuthTag(Buffer.from(authTagHex, 'hex'))

      let decrypted = decipher.update(encryptedText, 'hex', 'utf8')

      decrypted += decipher.final('utf8')

      return decrypted
    } catch (error) {
      logError({ error })
      throw new DecryptionFailedError()
    }
  }
}

import type { EncryptedData } from '@custom-types/services/hashes/encrypted-data'
import crypto from 'node:crypto'
import { env } from '@env/index'
import { logError } from '@lib/logger/helpers/log-error'
import { DecryptionFailedError } from '@use-cases/errors/generic/decryption-failed-error'

const ALGORITHM = 'aes-256-gcm'
const SECRET_KEY_BUFFER = Buffer.from(env.ENCRYPTION_KEY, 'hex')

const IV_HEX_LENGTH = 32
const AUTH_TAG_HEX_LENGTH = 32

export class EncryptionService {
  static encrypt(input: string): EncryptedData {
    const initializationVector = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY_BUFFER, initializationVector)

    let encrypted = cipher.update(input, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag().toString('hex')
    const initializationVectorHex = initializationVector.toString('hex')

    return `${initializationVectorHex}${authTag}${encrypted}` as EncryptedData
  }

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

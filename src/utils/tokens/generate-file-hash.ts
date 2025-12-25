import { v7 as uuidv7 } from 'uuid'

export function generateFileHash() {
  return uuidv7()
}

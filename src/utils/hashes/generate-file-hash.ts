import { v4 as uuidv4 } from 'uuid'

export function generateFileHash() {
  return uuidv4()
}

import { hashSync, genSaltSync, compareSync } from 'bcryptjs'

export const bcryptAdapter = {
  hash: (valueToEncrypt: string) => {
    const salt = genSaltSync()
    return hashSync(valueToEncrypt, salt)
  },
  compare: (valueToCompare: string, encryptedValue: string) => {
    return compareSync(valueToCompare, encryptedValue)
  }
}

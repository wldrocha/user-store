import jwt from 'jsonwebtoken'
import { envs } from '../envs'

const JWT_SECRET = envs.JWT_SEED

// Todo refactor hide dependency JWT_SECRET
export class JWTAdapter {
  static async generateToken(payload: any, duration: string = '2h') {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null)
        resolve(token)
      })
    })
  }
  // Todo incomplete method
  static validateToken(token: string) {
    throw new Error('Method not implemented.')
  }
}

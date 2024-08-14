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

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) resolve(null)
        resolve(decoded as T)
      })
    })
  }
}

import { NextFunction, Request, Response } from 'express'
import { JWTAdapter } from '../../config'
import { UserModel } from '../../data'
import { UserEntity } from '../../domain'

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({ error: 'Token is not provided' })
    }

    if (!authorization.includes('Bearer')) {
      return res.status(401).json({ error: 'Invalid Bearer token' })
    }

    const token = authorization.split(' ').at(1) || ''
    try {
      const payload = await JWTAdapter.validateToken<{ id: string }>(token)
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' })
      }
      const user = await UserModel.findById(payload.id)
      if (!user) {
        return res.status(401).json({ error: 'Invalid token - user' })
      }

      //   Todo validate if user is active
      req.body.user = UserEntity.fromObject(user)

      next()
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' })
    }
  }
}

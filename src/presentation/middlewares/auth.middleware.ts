import { NextFunction, Request, Response } from 'express'

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
        
    } catch (error) {
      return res.status(500).json({ error: 'Internal error' })
        
    }
  }
}

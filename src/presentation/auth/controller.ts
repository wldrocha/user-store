import { Request, Response } from 'express'

export class AuthController {
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json({ message: 'registerUser' })
  }
  loginUser = (req: Request, res: Response) => {
    res.json({ message: 'loginUser' })
  }
  validateEmail = (req: Request, res: Response) => {
    res.json({ message: 'validateEmail' })
  }
}

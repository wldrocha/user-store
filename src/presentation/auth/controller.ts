import { Request, Response } from 'express'
import { CustomError, RegisterUserDto } from '../../config'
import { AuthService } from '../services/auth.service'

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log('🚀 ~ AuthController ~ error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body)

    if (error) {
      return res.status(400).json({ error })
    }

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res))
  }
  loginUser = (req: Request, res: Response) => {
    res.json({ message: 'loginUser' })
  }
  validateEmail = (req: Request, res: Response) => {
    res.json({ message: 'validateEmail' })
  }
}

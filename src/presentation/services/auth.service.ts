import { bcryptAdapter, envs, JWTAdapter } from '../../config'
import { UserModel } from '../../data'
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'
import { EmailService } from './email.service'

export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  registerUser = async (registerUserDto: RegisterUserDto) => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('User already exists')

    try {
      const user = new UserModel(registerUserDto)

      user.password = bcryptAdapter.hash(registerUserDto.password)
      await user.save()

      const { password, ...userEntity } = UserEntity.fromObject(user)
      const token = await JWTAdapter.generateToken({ id: userEntity.id })

      if (!token) throw CustomError.internalServer('Error generating token')

      this.sendEmailValidationLink(user.email)

      return { user: userEntity, token }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  loginUser = async (loginUSerDto: LoginUserDto) => {
    const user = await UserModel.findOne({ email: loginUSerDto.email })
    if (!user) throw CustomError.notFound('Invalid credentials')

    const isMatching = bcryptAdapter.compare(loginUSerDto.password, user.password)

    if (!isMatching) throw CustomError.badRequest('Invalid credentials')

    const { password, ...userEntity } = UserEntity.fromObject(user)

    const token = await JWTAdapter.generateToken({ id: userEntity.id })

    if (!token) throw CustomError.internalServer('Error generating token')

    return { user: userEntity, token }
  }

  sendEmailValidationLink = async (email: string) => {
    const token = await JWTAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer('Error generating email token')
    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
    const html = `
      <h1>Validate your email</h1>
      <p></p>Click on the link below to validate your email</p>
      <a href="${link}">Validate email</a>
    `
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomError.internalServer('Error sending email')
    return true
  }

  public validateEmail = async (token: string) => {
    const payload = await JWTAdapter.validateToken(token)
    if (!payload) throw CustomError.unauthorized('Invalid token')

    const { email } = payload as { email: string }
    if (!email) throw CustomError.internalServer('IEmail not in token')

    const user = await UserModel.findOne({ email })
    if (!user) throw CustomError.internalServer('User email not exist')

    user.emailValidated = true
    await user.save()
    return true
  }
}

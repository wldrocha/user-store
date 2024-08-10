import { bcryptAdapter, JWTAdapter } from '../../config'
import { UserModel } from '../../data'
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'

export class AuthService {
  constructor() {}
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
      // Todo: Send email confirmation

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
}

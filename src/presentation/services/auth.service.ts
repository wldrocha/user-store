import { bcryptAdapter } from '../../config'
import { UserModel } from '../../data'
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'
// import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'

export class AuthService {
  constructor() {}
  registerUser = async (registerUserDto: RegisterUserDto) => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('User already exists')

    try {
      const user = new UserModel(registerUserDto)

      // Todo: Encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password)
      await user.save()
      // Todo JWT

      // Todo: Send email confirmation

      const { password, ...userEntity } = UserEntity.fromObject(user)

      return { user: userEntity, token: 'token123' }
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

    return { user: userEntity, token: 'token123' }
  }
}

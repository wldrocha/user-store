import { CustomError, RegisterUserDto, UserEntity } from '../../config'
import { UserModel } from '../../data'

export class AuthService {
  constructor() {}
  registerUser = async (registerUserDto: RegisterUserDto) => {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('User already exists')

    try {
      const user = new UserModel(registerUserDto)
      await user.save()

      // Todo: Encrypt password
      // Todo JWT

      // Todo: Send email confirmation

      const { password, ...userEntity } = UserEntity.fromObject(user)

      return { user: userEntity, token: 'token123' }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}

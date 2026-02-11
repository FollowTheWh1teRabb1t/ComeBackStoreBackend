import { UserRepository } from '../repositories/userRepository'
import { Hash } from '../utils/hash'
import { Token } from '../utils/jwt'

export class AuthService {
  private userRepository = new UserRepository()

  login = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Email ou senha inválidos.')
    }

    const passwordMatch = await Hash.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email ou senha inválidos.')
    }

    const token = Token.generate({ userId: user.id })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }

  register = async (data: {
    name: string
    email: string
    password: string
  }) => {
    const hashedPassword = await Hash.generate(data.password)

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    })
  }
}

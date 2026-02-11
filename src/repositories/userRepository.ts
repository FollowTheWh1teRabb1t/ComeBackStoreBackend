import prisma from '../database/prisma'

export class UserRepository {
  findByEmail = async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  findById = async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  create = async (data: {
    name: string
    email: string
    password: string
  }) => {
    return prisma.user.create({
      data,
    })
  }

  updateProfile = async (
    id: string,
    data: { name?: string; email?: string; phone?: string }
  ) => {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
  };

  updatePassword = async (id: string, password: string) => {
      return prisma.user.update({
        where: { id },
        data: { password },
      });
    };
}

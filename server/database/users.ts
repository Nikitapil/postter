import { prisma } from '~/server/database/index';
import bcrypt from 'bcrypt';
import { ICreateUserData } from '~/server/types/users-types';
import { z } from 'zod';
import { ApiError } from '~/server/utils/ApiError';

const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  repeatPassword: z.string(),
  name: z.string(),
  profileImage: z.string()
});

export const createUser = async (userData: ICreateUserData) => {
  const { username, email, password, repeatPassword, name, profileImage } =
    createUserSchema.parse(userData);

  if (password !== repeatPassword) {
    throw ApiError.BadRequest('Passwords are not equal');
  }

  const user = await getUserByUsername(username);

  if (user) {
    throw ApiError.BadRequest('User already exist');
  }

  const finalUserData = {
    username,
    email,
    name,
    profileImage,
    password: bcrypt.hashSync(userData.password, 10)
  };
  return prisma.user.create({
    data: finalUserData,
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      profileImage: true
    }
  });
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: { username }
  });
};

export const getUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

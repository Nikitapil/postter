import { prisma } from '~/server/database/index';
import bcrypt from 'bcrypt';
import {
  ICreateUserData,
  ILoginApiData,
  IUserDataFiltered
} from '~/server/types/users-types';
import { z } from 'zod';
import { ApiError } from '~/server/utils/ApiError';
import { generateTokens } from '~/server/utils/jwt';
import { updateRefreshToken } from '~/server/database/refresh-tokens';

const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  repeatPassword: z.string(),
  name: z.string(),
  profileImage: z.string()
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

//TODO wrap this into class

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

  const userFromDb = await prisma.user.create({
    data: finalUserData,
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      profileImage: true
    }
  });

  return createUserDataWithTokens(userFromDb);
};

export const login = async (loginData: ILoginApiData) => {
  const { username, password } = loginSchema.parse(loginData);
  const user = await getUserByUsername(username);
  if (!user) {
    throw ApiError.BadRequest('Username or password are invalid');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw ApiError.BadRequest('Username or password are invalid');
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage
  };

  return createUserDataWithTokens(userData);
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

//TODO this method must be private
export const createUserDataWithTokens = async (user: IUserDataFiltered) => {
  const { accessToken, refreshToken } = generateTokens(user);
  await updateRefreshToken({ token: refreshToken, userId: user.id });
  return {
    accessToken,
    refreshToken,
    user
  };
};

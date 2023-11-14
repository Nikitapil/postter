import { prisma } from '~/server/services/index';
import bcrypt from 'bcrypt';
import {
  ICreateUserData,
  IEditUserData,
  IGetProfile,
  ILoginApiData,
  IUserDataFiltered
} from '~/server/types/users-types';
import { z } from 'zod';
import { ApiError } from '~/server/utils/ApiError';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';
import {
  getRefreshTokenByToken,
  updateRefreshToken
} from '~/server/services/refresh-tokens';
import { safeUserSelect } from '~/server/utils/db-query-helpers';

const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  repeatPassword: z.string(),
  name: z.string().min(1),
  profileImage: z.string(),
  about: z.string()
});

const editUserSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email().min(1),
  name: z.string().min(1),
  profileImage: z.string(),
  about: z.string()
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

const getProfileSchema = z.object({
  profileId: z.string().min(1)
});

export const createUser = async (userData: ICreateUserData) => {
  const {
    username,
    email,
    password,
    repeatPassword,
    name,
    profileImage,
    about
  } = createUserSchema.parse(userData);

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
    about,
    password: bcrypt.hashSync(userData.password, 10)
  };

  const userFromDb = await prisma.user.create({
    data: finalUserData,
    select: safeUserSelect
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
    profileImage: user.profileImage,
    about: user.about,
    createdAt: user.createdAt
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
    where: { id },
    select: safeUserSelect
  });
};

export const createUserDataWithTokens = async (user: IUserDataFiltered) => {
  const { accessToken, refreshToken } = generateTokens(user);
  await updateRefreshToken({ token: refreshToken, userId: user.id });
  return {
    accessToken,
    refreshToken,
    user
  };
};

export const refreshAuth = async (refreshToken?: string) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const refreshTokenDataFromDb = await getRefreshTokenByToken(refreshToken);
  if (!refreshTokenDataFromDb) {
    throw ApiError.UnauthorizedError();
  }
  const decodedToken = decodeRefreshToken(refreshTokenDataFromDb.token);
  if (!decodedToken) {
    throw ApiError.UnauthorizedError();
  }
  const user = await prisma.user.findUnique({
    where: { id: decodedToken.userId },
    select: safeUserSelect
  });

  if (!user) {
    throw ApiError.UnauthorizedError();
  }

  return createUserDataWithTokens(user);
};

export const editUser = async (userData: IEditUserData) => {
  const { userId, username, email, name, profileImage, about } =
    editUserSchema.parse(userData);

  const user = await getUserById(userId);

  if (!user) {
    throw ApiError.NotFoundError('User not found');
  }

  if (user.username !== username) {
    const candidate = await getUserByUsername(username);
    if (candidate) {
      throw ApiError.BadRequest(`Username ${username} already exist`);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      email,
      username,
      name,
      profileImage,
      about
    },
    select: safeUserSelect
  });

  return updatedUser;
};

export const getProfile = async (params: IGetProfile) => {
  const { profileId } = getProfileSchema.parse(params);
  const profile = await getUserById(profileId);

  if (!profile) {
    throw ApiError.NotFoundError('User not found');
  }

  return { profile };
};

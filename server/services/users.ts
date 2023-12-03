import { prisma } from '~/server/services/index';
import bcrypt from 'bcrypt';
import {
  ICreateUserData,
  IEditUserData,
  IFollowUserParams,
  IGetFollowUsersList,
  IGetProfile,
  IGetUsersParams,
  ILoginApiData,
  ISafeUserFromDb
} from '~/server/types/users-types';
import { z } from 'zod';
import { ApiError } from '~/server/utils/ApiError';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';
import {
  getRefreshTokenByToken,
  updateRefreshToken
} from '~/server/services/refresh-tokens';
import {
  getPaginationParams,
  getSafeUserSelectWithFollowedBy,
  safeUserSelect
} from '~/server/utils/db-query-helpers';
import { userTransformer } from '~/server/transformers/user-transformers';
import { Prisma } from '.prisma/client';

const usernameSchema = z.string().min(1).max(16);
const emailSchema = z.string().email().min(1).max(30);
const passwordSchema = z.string().min(8).max(16);
const nameSchema = z.string().min(1).max(16);
const profileImageSchema = z.string();
const aboutSchema = z.string().max(500);
const userIdRequiredSchema = z.string().min(1);

const pageOptionalSchema = z.number().optional();
const limitOptionalSchema = z.number().optional();

const createUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: passwordSchema,
  name: nameSchema,
  profileImage: profileImageSchema,
  about: aboutSchema
});

const editUserSchema = z.object({
  userId: userIdRequiredSchema,
  username: usernameSchema,
  email: emailSchema,
  name: nameSchema,
  profileImage: profileImageSchema,
  about: aboutSchema
});

const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
});

const getProfileSchema = z.object({
  profileId: userIdRequiredSchema,
  currentUserId: userIdRequiredSchema
});

const followUserSchema = z.object({
  followByUserId: userIdRequiredSchema,
  followToUserId: userIdRequiredSchema
});

const getFollowUsersListSchema = z.object({
  currentUserId: userIdRequiredSchema,
  profileId: userIdRequiredSchema,
  filter: z.union([z.literal('followers'), z.literal('following')]),
  page: pageOptionalSchema,
  limit: limitOptionalSchema
});

const getUsersListSchema = z.object({
  currentUserId: userIdRequiredSchema,
  page: pageOptionalSchema,
  limit: limitOptionalSchema
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

  const userData: ISafeUserFromDb = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage,
    about: user.about,
    createdAt: user.createdAt,
    _count: user._count
  };

  return createUserDataWithTokens(userData);
};

export const getUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          following: true,
          followedBy: true
        }
      }
    }
  });
};

export const getUserById = (id: string, currentUserId: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: getSafeUserSelectWithFollowedBy(currentUserId)
  });
};

export const createUserDataWithTokens = async (user: ISafeUserFromDb) => {
  const { accessToken, refreshToken } = generateTokens(user);
  await updateRefreshToken({ token: refreshToken, userId: user.id });
  return {
    accessToken,
    refreshToken,
    user: userTransformer(user)
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

  const user = await getUserById(userId, userId);

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
  const { profileId, currentUserId } = getProfileSchema.parse(params);
  const profile = await getUserById(profileId, currentUserId);

  if (!profile) {
    throw ApiError.NotFoundError('User not found');
  }

  return { profile: userTransformer(profile) };
};

export const followUser = async (params: IFollowUserParams) => {
  const { followByUserId, followToUserId } = followUserSchema.parse(params);

  await prisma.user.update({
    where: {
      id: followByUserId
    },
    data: {
      following: {
        connect: { id: followToUserId }
      }
    },
    select: getSafeUserSelectWithFollowedBy(followByUserId)
  });

  return { isFollowedByCurrent: true };
};

export const unFollowUser = async (params: IFollowUserParams) => {
  const { followByUserId, followToUserId } = followUserSchema.parse(params);

  await prisma.user.update({
    where: {
      id: followByUserId
    },
    data: {
      following: {
        disconnect: { id: followToUserId }
      }
    },
    select: getSafeUserSelectWithFollowedBy(followByUserId)
  });

  return { isFollowedByCurrent: false };
};

export const toggleFollowUser = async (params: IFollowUserParams) => {
  const { followByUserId, followToUserId } = followUserSchema.parse(params);

  const followToUser = await prisma.user.findUnique({
    where: { id: followToUserId },
    select: getSafeUserSelectWithFollowedBy(followByUserId)
  });

  if (!followToUser) {
    throw ApiError.NotFoundError('User not found');
  }

  const isFollowedByCurrentUser = !!followToUser.followedBy.length;

  if (isFollowedByCurrentUser) {
    return unFollowUser(params);
  }

  return followUser(params);
};

export const getFollowUsersList = async (params: IGetFollowUsersList) => {
  const { currentUserId, profileId, filter, page, limit } =
    getFollowUsersListSchema.parse(params);

  const paginationParams = getPaginationParams(page, limit);

  const where: Prisma.UserWhereInput =
    filter === 'followers'
      ? {
          followingIDs: {
            has: profileId
          }
        }
      : {
          followedByIDs: {
            has: profileId
          }
        };

  const users = await prisma.user.findMany({
    where: where,
    select: getSafeUserSelectWithFollowedBy(currentUserId),
    ...paginationParams
  });

  const totalCount = await prisma.user.count({
    where
  });

  return {
    users: users.map((user) => userTransformer(user)),
    totalCount
  };
};

export const getUsers = async (params: IGetUsersParams) => {
  const { currentUserId, page, limit } = getUsersListSchema.parse(params);

  const paginationParams = getPaginationParams(page, limit);
  const users = await prisma.user.findMany({
    select: getSafeUserSelectWithFollowedBy(currentUserId),
    ...paginationParams,
    orderBy: [
      {
        followedBy: {
          _count: 'desc'
        }
      }
    ]
  });

  const totalCount = await prisma.user.count({});

  return {
    users: users.map((user) => userTransformer(user)),
    totalCount
  };
};

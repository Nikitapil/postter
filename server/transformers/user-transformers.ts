import { ISafeUserFromDb, IUserDataFiltered } from '~/server/types/users-types';

export const userTransformer = (
  user: ISafeUserFromDb,
  currentUserId: string
): IUserDataFiltered => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    profileImage: user.profileImage,
    about: user.about,
    createdAt: user.createdAt,
    followedByCount: user._count?.followedBy || 0,
    followingCount: user._count?.following || 0,
    isFollowedByCurrent: !!user.followedBy?.length,
    canFollow: user.id !== currentUserId
  };
};

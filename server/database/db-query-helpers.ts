import { Prisma } from '.prisma/client';

export const safeUserSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  username: true,
  profileImage: true
};

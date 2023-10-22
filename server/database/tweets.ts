import { ITweetDto } from '~/server/types/tweets-types';
import { prisma } from '~/server/database/index';

export const createTweet = (tweetData: ITweetDto) => {
  return prisma.tweet.create({
    data: tweetData
  });
};

export const getTweets = (search: string) => {
  // TODO refactor this, if for replies need only count than get only count of them
  return prisma.tweet.findMany({
    where: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          profileImage: true
        }
      },
      mediaFiles: {
        select: {
          id: true,
          url: true
        }
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          }
        }
      },
      replyTo: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          }
        }
      }
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  });
};

export const getTweetById = (id: string) => {
  return prisma.tweet.findUnique({
    // TODO refactor this params
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          profileImage: true
        }
      },
      mediaFiles: {
        select: {
          id: true,
          url: true
        }
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          },
          mediaFiles: {
            select: {
              id: true,
              url: true
            }
          },
          replyTo: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                  profileImage: true
                }
              }
            }
          }
        }
      },
      replyTo: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              username: true,
              profileImage: true
            }
          }
        }
      }
    }
  });
};

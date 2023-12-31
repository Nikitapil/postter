import { IMediaFileDto } from '~/server/types/media-files-types';
import { prisma } from '~/server/services/prisma';
import { imageToBase64 } from '~/server/utils/images';

export const createMediaFile = (mediaFile: IMediaFileDto) => {
  const url = imageToBase64(mediaFile.url);

  return prisma.mediaFile.create({
    data: { ...mediaFile, url },
    select: {
      id: true,
      url: true
    }
  });
};

import {IMediaFileDto} from "~/server/types/media-files-types";
import {prisma} from "~/server/database/index";

export const createMediaFile = (mediaFile: IMediaFileDto) => {
    return prisma.mediaFile.create({
        data: mediaFile
    })
}
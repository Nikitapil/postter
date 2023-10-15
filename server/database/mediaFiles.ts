import {IMediaFileDto} from "~/server/types/media-files-types";
import {prisma} from "~/server/database/index";
import {imageToBase64} from "~/server/utils/images";



export const createMediaFile = (mediaFile: IMediaFileDto) => {

    const url = imageToBase64(mediaFile.url)

    return prisma.mediaFile.create({
        data: {...mediaFile, url}
    })
}
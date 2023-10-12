import {prisma} from "~/server/database/index";
import {ISaveRefreshTokenData} from "~/server/types/refresh-tokens-types";

export const createRefreshToken = ({token, userId}: ISaveRefreshTokenData) => {
    return prisma.refreshToken.create({
        data: {
            token,
            userId
        }
    })
}
import {getCookie, sendError} from "h3";
import {createRefreshToken, getRefreshTokenbyToken} from "~/server/database/refresh-tokens";
import {decodeRefreshToken, generateTokens} from "~/server/utils/jwt";
import {getUserById} from "~/server/database/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'twi-refresh-token')
    if (!refreshToken) {
        return sendError(event, createError( {
            statusMessage: 'Refresh token is invalid',
            statusCode: 401
        }
        ))
    }

    const refreshTokenDataFromDb = await getRefreshTokenbyToken(refreshToken)

    if (!refreshTokenDataFromDb) {
        return sendError(event, createError( {
                statusMessage: 'Refresh token is invalid',
                statusCode: 401
            }
        ))
    }

    const decodedToken = decodeRefreshToken(refreshTokenDataFromDb.token)

    try {
        const user = await getUserById(decodedToken?.userId)
        if(!user) {
            return sendError(event, createError( {
                    statusMessage: 'User not found',
                    statusCode: 401
                }
            ))
        }
        const { accessToken } = generateTokens(user)
        // TODO update refresh token here
        return {
            accessToken,
            user: userTransformer(user)
        }
    } catch (e) {
        return sendError(event, createError( {
                statusMessage: 'Something went wrong',
                statusCode: 401
            }
        ))
    }
})
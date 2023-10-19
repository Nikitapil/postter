import UrlPattern from "url-pattern";
import {decodeAccessToken} from "~/server/utils/jwt";
import {sendError} from "h3";
import {getUserById} from "~/server/database/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/user/tweets/:id'
    ]

    const isHandledByThisMiddleware = endpoints.some(endpoints => {
        const pattern = new UrlPattern(endpoints)

        return pattern.match(event.path)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    const token = event.headers.get('Authorization')?.split(' ')[1] || ''

    const decoded = decodeAccessToken(token)

    if (!decoded) {
         return sendError(event, createError( {
            statusMessage: 'Invalid AccessToken',
            statusCode: 401
        }))
    }

    try {
        const userId = decoded.userId
        const user = await getUserById(userId)

        if (!user) {
            return sendError(event, createError( {
                statusMessage: 'Invalid AccessToken',
                statusCode: 401
            }))
        }

        event.context.auth = { user: userTransformer(user) }
    } catch (e) {
        return sendError(event, createError( {
            statusMessage: 'Something went wrong',
            statusCode: 400
        }))
    }
})
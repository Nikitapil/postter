import {getCookie} from "h3";
import {removeRefreshToken} from "~/server/database/refresh-tokens";

export default defineEventHandler(async (event) => {
    try {
        const token = getCookie(event, 'twi-refresh-token')
        await removeRefreshToken(token as string)
        deleteCookie(event, 'twi-refresh-token');

        return { message: 'Success' }
    } catch (e) {
        //TODO handle this error
        throw e
    }
})
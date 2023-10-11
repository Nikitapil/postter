import {sendError} from "h3";
import {createUser} from "~/server/database/users";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password, repeatPassword, name } = body

    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'InvalidParams' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords are not equal' }))
    }

    const userData = {
        username,
        email,
        password,
        name
    }

    const user = await createUser(userData)

    return user
})
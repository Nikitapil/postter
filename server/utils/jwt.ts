import jwt from 'jsonwebtoken';
import {IUserFormDb} from "~/server/types/users-types";

const generateAccessToken = (user: IUserFormDb) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
        expiresIn: '10m'
    })
}

const generateRefreshToken = (user: IUserFormDb) => {
    const config = useRuntimeConfig()

    return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
        expiresIn: '4h'
    })
}

export const generateTokens = (user: IUserFormDb) => {

    const accessToken = generateAccessToken(user)

    const refreshToken = generateRefreshToken(user)

    return {
        accessToken,
        refreshToken
    }
}
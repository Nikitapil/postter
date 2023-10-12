import {prisma} from "~/server/database/index";
import bcrypt from 'bcrypt'
import {ICreateUserData} from "~/server/types/users-types";

export const createUser = (userData: ICreateUserData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }
    return prisma.user.create({
        data: finalUserData
    })
}

export const getUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: { username }
    })
}
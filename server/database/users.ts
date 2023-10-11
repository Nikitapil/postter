import {prisma} from "~/server/database/index";
import {IUserData} from "~/server/database/types";

export const createUser = (userData: IUserData) => {
    return prisma.user.create({
        data: userData
    })
}
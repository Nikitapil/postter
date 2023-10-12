import {IUserFormDb} from "~/server/types/users-types";

export const userTransformer = (user: IUserFormDb) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
    }
}
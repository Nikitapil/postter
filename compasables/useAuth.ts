import {ILoginData, IUser} from "~/types/auth-types";

export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')

    const setToken = (newToken: string) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: IUser) => {
        const user = useAuthUser()
        user.value = newUser
    }

    const login = async (loginData: ILoginData) => {
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: loginData
            })

            setToken(data.accessToken)
            setUser(data.user)
        } catch (e) {
            // TODO handle this error
            throw e
        }
    }

    return { login, useAuthUser, useAuthToken }
}
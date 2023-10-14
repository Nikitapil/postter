import {IJwtDecodedToken, ILoginData, IUser} from "~/types/auth-types";
import jwtDecode from "jwt-decode";

export default () => {
    const useAuthToken = () => useState<string>('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('isLoading', () => true)

    const setToken = (newToken: string) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: IUser) => {
        const user = useAuthUser()
        user.value = newUser
    }

    const setAuthLoading = (value: boolean) => {
        const isLoading = useAuthLoading()
        isLoading.value = value
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

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken()

        if (!authToken) {
            return
        }

        const jwt: IJwtDecodedToken = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000

        console.log(newRefreshTime)

        setTimeout(() => {
            refreshToken()
        }, newRefreshTime)
    }

    const refreshToken = async () => {
        try {
            const data = await $fetch('/api/auth/refresh')
            setToken(data.accessToken)
            setUser(data.user)
            reRefreshAccessToken()
        } catch (e) {
            // TODO handle this error
            throw e
        }
    }

    const initAuth = async () => {
        try {
            setAuthLoading(true)
            await refreshToken()
        } catch (e) {
            // TODO handle this error
            throw e
        } finally {
            setAuthLoading(false)
        }
    }

    return { login, useAuthUser, useAuthToken, initAuth, useAuthLoading }
}
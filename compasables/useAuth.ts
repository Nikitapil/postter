import {IJwtDecodedToken, ILoginData, IUser} from "~/types/auth-types";
import jwtDecode from "jwt-decode";
import useFetchApi from "~/compasables/useFetchApi";

export default () => {
    const useAuthToken = () => useState<string | null>('auth_token')
    const useAuthUser = () => useState<IUser | null>('auth_user')
    const useAuthLoading = () => useState('isLoading', () => true)

    const setToken = (newToken: string | null) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }

    const setUser = (newUser: IUser | null) => {
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

        if (!authToken.value) {
            return
        }

        const jwt: IJwtDecodedToken = jwtDecode(authToken.value)

        const newRefreshTime = jwt.exp - 60000


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
    const logout = async () => {
        try {
            await useFetchApi('api/auth/logout', {
                method: 'POST'
            })
            setToken(null)
            setUser(null)
        } catch (e) {
            // TODO handle this error
            throw e
        }
    }

    return { login, useAuthUser, useAuthToken, initAuth, useAuthLoading, logout }
}
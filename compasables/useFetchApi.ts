import {IMap} from "~/types/common-types";
import useAuth from "~/compasables/useAuth";

export default (url: string, options: IMap = {}) => {
    const {useAuthToken} = useAuth()

    const token = useAuthToken()


    const headersFromRequest = options.headers || {}
    return $fetch(url, {
        ...options,
        headers: {
            ...headersFromRequest,
            Authorization: `Bearer ${token.value}`
        }
    })
}
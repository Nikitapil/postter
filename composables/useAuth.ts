import {
  IJwtDecodedToken,
  ILoginData,
  IRegisterData,
  IUser,
  TRegisteredDataKey
} from '~/types/auth-types';
import jwtDecode from 'jwt-decode';
import useFetchApi from '~/composables/useFetchApi';

export default () => {
  const useAuthToken = () => useState<string | null>('auth_token');
  const useAuthUser = () => useState<IUser | null>('auth_user');
  const useAuthLoading = () => useState('isAuthLoading', () => true);

  const setToken = (newToken: string | null) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: IUser | null) => {
    const user = useAuthUser();
    user.value = newUser;
  };

  const setAuthLoading = (value: boolean) => {
    const isLoading = useAuthLoading();
    isLoading.value = value;
  };

  const register = async (data: IRegisterData) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const dataItem = data[key as TRegisteredDataKey];
      if (dataItem) {
        formData.append(key, dataItem);
      }
    });

    try {
      const data = await $fetch('/api/auth/register', {
        method: 'POST',
        body: formData
      });

      setToken(data.accessToken);
      setUser(data.user);
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Incorrect user data');
    }
  };

  const login = async (loginData: ILoginData) => {
    try {
      const data = await $fetch('/api/auth/login', {
        method: 'POST',
        body: loginData
      });

      setToken(data.accessToken);
      setUser(data.user);
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Incorrect user data');
    }
  };

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) {
      return;
    }

    const jwt: IJwtDecodedToken = jwtDecode(authToken.value);

    // Updating token when 1 minute left
    const newRefreshTime =
      new Date(jwt.exp * 1000).getTime() - new Date().getTime() - 60000;

    setTimeout(() => {
      refreshToken();
    }, newRefreshTime);
  };

  const refreshToken = async () => {
    try {
      const data = await $fetch('/api/auth/refresh');
      setToken(data.accessToken);
      setUser(data.user);
      reRefreshAccessToken();
    } catch (e) {
      setToken(null);
      setUser(null);
    }
  };

  const initAuth = async () => {
    try {
      setAuthLoading(true);
      await refreshToken();
    } catch (e) {
      setToken(null);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await useFetchApi('/api/auth/logout', {
        method: 'POST'
      });
      setToken(null);
      setUser(null);
    } catch (e: any) {
      const { $toast } = useNuxtApp();
      $toast.error(e?.statusMessage || 'Service Unavailable, try again later');
    }
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
    logout,
    register
  };
};

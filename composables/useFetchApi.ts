import { IMap } from '~/types/common-types';
import useAuth from '~/composables/useAuth';

export default <T>(url: string, options: IMap = {}): Promise<T> => {
  const { useAuthToken } = useAuth();

  const token = useAuthToken();
  const headersFromRequest = options.headers || {};
  return $fetch(url, {
    ...options,
    headers: {
      ...headersFromRequest,
      Authorization: `Bearer ${token.value}`
    }
  });
};

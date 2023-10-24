import { IMap } from '~/types/common-types';
import useAuth from '~/compasables/useAuth';

export default <T>(url: string, options: IMap = {}): Promise<T> => {
  const { useAuthToken } = useAuth();

  const token = useAuthToken();
// TODO update token if expired
  const headersFromRequest = options.headers || {};
  return $fetch(url, {
    ...options,
    headers: {
      ...headersFromRequest,
      Authorization: `Bearer ${token.value}`
    }
  });
};

import type { FetchOption } from './fetchClient';
import { fetchClient } from './fetchClient';

type FetcherArgs = Omit<FetchOption, 'method'>;

export const fetcher = {
  get: async <T>({ path, isAuthRequire }: FetcherArgs): Promise<T> => {
    const response = await fetchClient({
      path,
      method: 'GET',
      isAuthRequire,
    });

    const data = await response.json();

    return data.data as T;
  },
  post: async ({ path, body, isAuthRequire = false }: FetcherArgs) => {
    await fetchClient({ path, method: 'POST', body, isAuthRequire });
  },
  postWithResponse: async <T>({ path, body, isAuthRequire = false }: FetcherArgs): Promise<T> => {
    const response = await fetchClient({ path, method: 'POST', body, isAuthRequire });

    const data = await response.json();

    return data.data as T;
  },
  delete: async ({ path, isAuthRequire = false }: FetcherArgs) => {
    await fetchClient({ path, method: 'DELETE', isAuthRequire });
  },
};

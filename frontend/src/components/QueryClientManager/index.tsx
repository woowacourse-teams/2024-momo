import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import useErrorDispatch from '@hooks/useErrorDispatch/useErrorDispatch';

import { ResponseError } from '@utils/responseError';

export default function QueryClientManager({ children }: PropsWithChildren) {
  const setError = useErrorDispatch();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
      mutations: {
        onError: (error: unknown) => {
          if (error instanceof ResponseError) {
            setError(error);
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

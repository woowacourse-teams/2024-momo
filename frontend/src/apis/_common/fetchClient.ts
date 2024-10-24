import { ResponseError } from '@utils/responseError';

import { BASE_URL } from '@constants/api';

export type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface FetchOption {
  path: string;
  method: HTTPMethod;
  body?: object;
  headers?: HeadersInit;
  /**
   * @Yoonkyoungme
   * isAuthRequire: 인증이 필요한 API 요청인지를 나타내는 플래그
   * true로 설정하면 요청에 credentials: 'include'가 추가되어, 서버에서 설정한 인증 쿠키를 자동으로 포함시킨다.
   *
   * @default false
   */
  isAuthRequire?: boolean;
}

// TODO: TypeError: Failed to Fetch에 대한 에러 처리는 어떻게 할 예정인지.
const createFetchClient = (baseUrl: string) => {
  return async ({ path, method, body, isAuthRequire, headers }: FetchOption) => {
    try {
      const url = `${baseUrl}${path}`;
      const response: Response = await fetch(url, {
        method,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
        credentials: isAuthRequire ? 'include' : 'omit',
      });

      // response 객체는 에러가 발생하면 데이터는 응답 객체가 되고, 정상적인 응답이 오면 데이터 객체가 된다.
      if (!response.ok) {
        // 응답이 에러 객체인 경우 ResponseError 객체를 생성 -> QueryClientManager 컴포넌트에서 에러 상태를 업데이트
        const errorData = await response.json();
        throw new ResponseError(errorData);
      }

      return response;
    } catch (error) {
      // catch network error
      if (error instanceof Error) {
        throw error;
      }

      throw error;
    }
  };
};

export const fetchClient = createFetchClient(BASE_URL);
